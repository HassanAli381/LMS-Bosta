import { StatusCodes } from 'http-status-codes';
import AppError from './../utils/AppError.js';

export const unhandledRoutesHandler = (req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} is not found`, StatusCodes.NOT_FOUND));
};
