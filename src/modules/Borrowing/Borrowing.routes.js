import express from 'express';
import {
    checkOutBook,
    getAllBorrowing,
    getBooksExceededDueDates,
    getBorrowedBooks,
    returnBook,
} from './Borrowing.controller.js';
import { rateLimiter } from '../../shared/middlewares/rate-limiter.js';

const router = express.Router();

router.route('/').get(getAllBorrowing);
router.route('/out-of-date').get(getBooksExceededDueDates);
router.route('/:id').get(getBorrowedBooks).post(rateLimiter, checkOutBook).patch(returnBook);

export default router;
