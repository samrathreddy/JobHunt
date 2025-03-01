export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = '7d';
export const EMAIL_VERIFICATION_EXPIRES = '24h';
export const PASSWORD_RESET_EXPIRES = '1h';

export const RATE_LIMIT = {
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 requests per windowMs
  },
  EMAIL: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3 // limit each IP to 3 email requests per windowMs
  }
};