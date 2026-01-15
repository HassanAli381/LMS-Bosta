import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import * as borrowerService from './borrower.service.js';
import { SUCCESS } from '../../shared/utils/response-status.js';
import AppError from '../../shared/utils/AppError.js';

export const getAllBorrowers = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { rows: borrowers, count } = await borrowerService.getAllBorrowers(page, limit);

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Book Retrieved Successfully',
        results: borrowers.length,
        total: count,
        page,
        data: {
            borrowers,
        },
    });
});

export const getBorrower = asyncHandler(async (req, res, next) => {
    const borrower = await borrowerService.getBorrowerById(req.params.id);
    if (!borrower) {
        return next(new AppError('No such borrower', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Borrower Retrieved Successfully',
        data: {
            borrower,
        },
    });
});

export const updateBorrower = asyncHandler(async (req, res, next) => {
    const Borrower = await borrowerService.updateBorrower(req.params.id, req.body);
    if (!Borrower) {
        return next(new AppError('No such Borrower', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Borrower updated Successfully',
        data: {
            Borrower,
        },
    });
});

export const deleteBorrower = asyncHandler(async (req, res, next) => {
    const borrower = await borrowerService.deleteBorrower(req.params.id);
    if (!borrower) {
        return next(new AppError('No such borrower', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.NO_CONTENT).json({
        status: SUCCESS,
        msg: 'borrower deleted Successfully',
    });
});
