import rateLimit from 'express-rate-limit';
import { RATE_LIMIT } from '../config/constants.js';

export const authLimiter = rateLimit({
  windowMs: RATE_LIMIT.AUTH.windowMs,
  max: RATE_LIMIT.AUTH.max,
  message: {
    message: 'Too many attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Ensure proper IP handling
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  }
});

export const emailLimiter = rateLimit({
  windowMs: RATE_LIMIT.EMAIL.windowMs,
  max: RATE_LIMIT.EMAIL.max,
  message: {
    message: 'Too many email requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Ensure proper IP handling
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  }
});