import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../shared/utils/AppError.js';
import { SUCCESS } from '../../shared/utils/response-status.js';
import bcrypt from 'bcrypt';
import * as borrowerService from './../borrower/borrower.service.js';

const signToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '10d',
    });

const createSendToken = (borrower, statusCode, res) => {
    const token = signToken(borrower._id);

    res.status(statusCode).json({
        status: SUCCESS,
        token,
        data: { borrower },
    });
};

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', StatusCodes.BAD_REQUEST));
    }

    const borrower = await borrowerService.getBorrowerByEmail(email);
    if (!borrower || !(await bcrypt.compare(password, borrower.password))) {
        const err = new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED);
        return next(err);
    }

    createSendToken(borrower, StatusCodes.OK, res);
});

export const register = asyncHandler(async (req, res, next) => {
    const newBorrower = await borrowerService.registerBorrower(req.body);
    createSendToken(newBorrower, StatusCodes.CREATED, res);
});
