import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});


export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"JobHub" <noreply@jobhub.com>',
    to,
    subject: 'Your One-Time Password (OTP)',
    html: `
      <h1>Your OTP Code</h1>
      <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
      <p>Please use this code to complete your verification.</p>
      <p>This OTP will expire in 5 minutes.</p>
    `
  });
};

export const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"JobHub" <noreply@jobhub.com>',
    to,
    subject: 'Reset your password',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the button below to create a new password:</p>
      <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
        Reset Password
      </a>
      <p>If the button doesn't work, you can also click this link:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
    `
  });
};