import AppError from './../utils/AppError.js';
import { ERROR } from './../utils/response-status.js';
import { StatusCodes } from 'http-status-codes';

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDuplicatedFieldDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];
    const message = `Duplicated field: ${field} with value: ${value}. Please use another value!`;

    return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, StatusCodes.BAD_REQUEST);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: ERROR,
            message: 'Something went wrong',
        });
    }
};

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', StatusCodes.UNAUTHORIZED);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired. Please log in again!', StatusCodes.UNAUTHORIZED);

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    err.status = err.status || ERROR;
    if (process.env.NODE_ENV !== 'production') {
        return sendErrorDev(err, res);
    }

    let error = { ...err, message: err.message };

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicatedFieldDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, res);
};
