import express from 'express';
import {
    addBook,
    deleteBook,
    getAllBooks,
    getBook,
    searchBooks,
    updateBook,
} from './book.controller.js';
const router = express.Router();

router.route('/').post(addBook).get(getAllBooks);

router.route('/search/:query').get(searchBooks);

router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

export default router;
