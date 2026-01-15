import express from 'express';
import {
    deleteBorrower,
    getAllBorrowers,
    getBorrower,
    updateBorrower,
} from './borrower.controller.js';

const router = express.Router();

router.route('/').get(getAllBorrowers);

router.route('/:id').get(getBorrower).patch(updateBorrower).delete(deleteBorrower);

export default router;
