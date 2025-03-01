import User from '../models/User.js';
import Otp from '../models/otp.js'; // Import the OTP model
import { sendOtpEmail } from '../config/email.js';
import crypto from 'crypto';

// Send OTP
export const sendOtpSignup = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      return res.status(404).json({ message: 'User already registered' });
    }

    // Generate a cryptographically secure OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing OTPs for this email
    await Otp.deleteMany({ email });

    // Hash the OTP before storing
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    
    // Save hashed OTP to the OTP collection
    await Otp.create({ 
      email, 
      otp: hashedOtp, 
      expiresAt,
      attempts: 0 // Track verification attempts
    });

    await sendOtpEmail(email, otp);
    res.status(200).json({ 
      message: 'OTP sent to your email',
      validUntil: expiresAt
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Verify OTP
export const verifyOtpSignup = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpRecord = await Otp.findOne({ email });
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Please request a new OTP' });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired. Please request a new one' });
    }

    // Check maximum attempts
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'Too many failed attempts. Please request a new OTP' });
    }

    // Hash the received OTP and compare
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    if (hashedOtp !== otpRecord.otp) {
      // Increment attempts
      await Otp.updateOne({ _id: otpRecord._id }, { $inc: { attempts: 1 } });
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');
    
    // Update OTP record with verification token
    otpRecord.verificationToken = verificationTokenHash;
    await otpRecord.save();

    // Set token expiration to 15 minutes
    const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000);
    
    res.status(200).json({ 
      message: 'OTP verified successfully',
      verificationToken,
      validUntil: tokenExpiration
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
}; 