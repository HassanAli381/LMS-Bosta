import { Op } from 'sequelize';
import { Book, Borrower, Borrowing } from '../index.models.js';

export const createBorrowing = async (data) => {
    return await Borrowing.create(data);
};

export const getAllBorrowing = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await Borrowing.findAndCountAll({
        limit,
        offset,
        include: [
            {
                model: Borrower,
                attributes: ['id', 'name', 'email'],
            },
            {
                model: Book,
                attributes: ['id', 'title', 'author', 'isbn'],
            },
        ],
        order: [['borrowedAt', 'DESC']],
    });
};

export const getBorrowing = async (id) => {
    return await Borrowing.findByPk(id);
};

export const checkBorrowing = async (borrowerId, bookId) => {
    const borrowing = await Borrowing.findAll({
        where: {
            [Op.and]: [{ borrowerId }, { bookId }, { returnedAt: null }],
        },
    });
    return borrowing;
};

export const getBorrowerBorrowings = async (id) => {
    const borrowings = await Borrowing.findAll({
        where: {
            [Op.and]: [{ borrowerId: id }, { returnedAt: null }],
        },
        include: [
            {
                model: Book,
                attributes: ['id', 'title', 'author', 'isbn'],
            },
        ],
    });

    return borrowings;
};

export const getBorrowingsExceededDueDate = async () => {
    return await Borrowing.findAll({
        where: {
            returnedAt: null,
            dueDate: {
                [Op.lt]: new Date(),
            },
        },
        include: [
            {
                model: Book,
                attributes: ['id', 'title', 'author', 'isbn'],
            },
        ],
    });
};

export const updateBorrowing = async (id, data) => {
    const borrowing = await Borrowing.findByPk(id);
    if (!borrowing) return null;

    return await borrowing.update(data);
};

export const deleteBook = async (id) => {
    const borrowing = await Borrowing.findByPk(id);
    if (!borrowing) return null;

    await borrowing.destroy();
    return true;
};
