import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import * as bookService from './book.service.js';
import { SUCCESS } from '../../shared/utils/response-status.js';
import AppError from '../../shared/utils/AppError.js';

export const addBook = asyncHandler(async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new AppError('No request body given', StatusCodes.BAD_REQUEST));
    }

    const book = await bookService.createBook(req.body);

    res.status(StatusCodes.CREATED).json({
        status: SUCCESS,
        msg: 'Book Created Successfully',
        data: {
            book,
        },
    });
});

export const getAllBooks = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { rows: books, count } = await bookService.getAllBooks(page, limit);

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Book Retrieved Successfully',
        results: books.length,
        total: count,
        page,
        data: {
            books,
        },
    });
});

export const getBook = asyncHandler(async (req, res, next) => {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
        return next(new AppError('No such book', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Book Retrieved Successfully',
        data: {
            book,
        },
    });
});

export const updateBook = asyncHandler(async (req, res, next) => {
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) {
        return next(new AppError('No such book', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Book updated Successfully',
        data: {
            book,
        },
    });
});

export const deleteBook = asyncHandler(async (req, res, next) => {
    const book = await bookService.deleteBook(req.params.id);
    if (!book) {
        return next(new AppError('No such book', StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.NO_CONTENT).json({
        status: SUCCESS,
        msg: 'Book deleted Successfully',
    });
});

export const searchBooks = asyncHandler(async (req, res, next) => {
    const { query } = req.params;
    const books = await bookService.searchBooks(query);

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Book Retrieved Successfully',
        results: books.length,
        data: {
            books,
        },
    });
});
