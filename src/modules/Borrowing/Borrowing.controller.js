import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import * as borrowerService from './../borrower/borrower.service.js';
import * as bookService from './../book/book.service.js';
import * as borrowingService from './Borrowing.service.js';
import AppError from '../../shared/utils/AppError.js';
import { SUCCESS } from '../../shared/utils/response-status.js';

//  check out a book
export const checkOutBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const book = await bookService.getBookById(id);
    if (!book) {
        return next(new AppError('No such book', StatusCodes.NOT_FOUND));
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new AppError('No request body given', StatusCodes.BAD_REQUEST));
    }

    const borrower = await borrowerService.getBorrowerById(req.body.borrowerId);
    if (!borrower) {
        return next(new AppError('No such borrower', StatusCodes.NOT_FOUND));
    }

    // check if the user has borrowed the book before
    const checkBorrowing = await borrowingService.checkBorrowing(req.body.borrowerId, id);
    if (checkBorrowing !== null && checkBorrowing.length > 0) {
        return next(new AppError('You have checked out this book before', StatusCodes.BAD_REQUEST));
    }

    if (book.quantity <= 0) {
        return next(
            new AppError('Book is not available now quantity is zero', StatusCodes.NOT_FOUND)
        );
    }

    // update book
    await bookService.updateBook(id, {
        quantity: book.quantity - 1,
    });

    // Create new borrowing.
    const data = {
        ...req.body,
        bookId: id,
    };

    const newBorrowing = await borrowingService.createBorrowing(data);

    res.status(StatusCodes.CREATED).json({
        status: SUCCESS,
        msg: 'Borrowing Book Successfully',
        data: {
            newBorrowing,
        },
    });
});

// Get All Borrowing
export const getAllBorrowing = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { rows: borrowings, count } = await borrowingService.getAllBorrowing(page, limit);

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Book Retrieved Successfully',
        results: borrowings.length,
        total: count,
        page,
        data: {
            borrowings,
        },
    });
});

// borrower can return a book.
export const returnBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const borrowing = await borrowingService.getBorrowing(id);
    if (!borrowing) {
        return next(new AppError('No such borrowing', StatusCodes.BAD_REQUEST));
    }
    if (borrowing.returnedAt) {
        return next(new AppError('Book is already returned', StatusCodes.BAD_REQUEST));
    }

    const bookId = borrowing.bookId;
    const book = await bookService.getBookById(bookId);
    if (!book) {
        return next(new AppError('No such book', StatusCodes.NOT_FOUND));
    }

    await bookService.updateBook(bookId, {
        quantity: book.quantity + 1,
    });

    await borrowingService.updateBorrowing(id, {
        returnedAt: new Date(),
    });

    const updatedBorrowing = await borrowingService.getBorrowing(id);

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Returned Book Successfully',
        data: {
            updatedBorrowing,
        },
    });
});

// borrower can check the books they currently have
export const getBorrowedBooks = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const myBorrowings = await borrowingService.getBorrowerBorrowings(id);

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Retrieving Borrowed Books Successfully',
        results: myBorrowings.length,
        data: {
            myBorrowings,
        },
    });
});

// The system should keep track of due dates for the books and list books that are overdue.
export const getBooksExceededDueDates = asyncHandler(async (req, res, next) => {
    const outOfDateBorrowings = await borrowingService.getBorrowingsExceededDueDate();

    res.status(StatusCodes.OK).json({
        status: SUCCESS,
        msg: 'Retrieving Books that exceeded the due date Successfully',
        results: outOfDateBorrowings.length,
        data: {
            outOfDateBorrowings,
        },
    });
});
