import rateLimit from 'express-rate-limit';
import { FAIL } from '../utils/response-status.js';

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    statusCode: 429,

    message: {
        status: FAIL,
        message: 'Too many requests! please try again in an hour!',
    },
});
