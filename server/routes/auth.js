import express from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { authLimiter, emailLimiter } from '../middleware/rateLimiter.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import { sendOtpEmail, sendPasswordResetEmail } from '../config/email.js';
import { JWT_SECRET, JWT_EXPIRES_IN, EMAIL_VERIFICATION_EXPIRES, PASSWORD_RESET_EXPIRES } from '../config/constants.js';
import { sendOtpSignup, verifyOtpSignup } from '../controllers/otpController.js'; // Import the OTP controller
import Otp from '../models/otp.js'; // Import the OTP model

const router = express.Router();

// Validation middleware
const validateSignup = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required')
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Sign up
router.post('/signup', authLimiter, validateSignup, async (req, res) => {
  try {
    const { email, password, name, verificationToken } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser !== null) {
      return res.status(406).json({ message: 'Email already registered' });
    }

    if (!verificationToken) {
      return res.status(406).json({ message: 'OTP verification required before signup' });
    }

    // Find OTP record and verify token
    const verificationTokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');
    const otpRecord = await Otp.findOne({ 
      email,
      verificationToken: verificationTokenHash,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        message: 'Invalid or expired verification token. Please verify OTP again.'
      });
    }


    // Create user
    const user = new User({
      email,
      password,
      name,
      isVerified: true, // User is verified since they completed OTP verification
    });
    await user.save();

    // Delete the OTP record after successful signup
    await Otp.deleteOne({ _id: otpRecord._id });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating account' });
  }
});

// Login
router.post('/login', authLimiter, validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// // Verify email
// router.get('/verify-email/:token', async (req, res) => {
//   try {
//     const { token } = req.params;

//     const user = await User.findOne({
//       verificationToken: token,
//       verificationTokenExpires: { $gt: new Date() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired verification token' });
//     }

//     user.isVerified = true;
//     user.verificationToken = undefined;
//     user.verificationTokenExpires = undefined;
//     await user.save();

//     res.json({ message: 'Email verified successfully' });
//   } catch (error) {
//     console.error('Verify email error:', error);
//     res.status(500).json({ message: 'Error verifying email' });
//   }
// });

// // Resend verification email
// router.post('/resend-verification', emailLimiter, async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({ message: 'Email already verified' });
//     }

//     const verificationToken = crypto.randomBytes(32).toString('hex');
//     user.verificationToken = verificationToken;
//     user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
//     await user.save();

//     await sendVerificationEmail(email, verificationToken);

//     res.json({ message: 'Verification email sent' });
//   } catch (error) {
//     console.error('Resend verification error:', error);
//     res.status(500).json({ message: 'Error sending verification email' });
//   }
// });

// Forgot password
router.post('/forgot-password', emailLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error sending reset email' });
  }
});

// Reset password
router.post('/reset-password/', authLimiter, async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Get current user
router.get('/me', protect, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
  });
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      return res.status(406).json({ message: 'User found forward to login' });
    }
    sendOtpSignup(req, res);
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    verifyOtpSignup(req, res);
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});

export default router;