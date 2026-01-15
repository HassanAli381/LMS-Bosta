import { Op } from 'sequelize';
import { Book } from '../index.models.js';

export const createBook = async (data) => {
    return await Book.create(data);
};

export const getAllBooks = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await Book.findAndCountAll({
        limit,
        offset,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'title', 'author', 'isbn', 'quantity'],
    });
};

export const getBookById = async (id) => {
    return await Book.findByPk(id);
};

export const updateBook = async (id, data) => {
    const book = await Book.findByPk(id);
    if (!book) return null;

    return await book.update(data);
};

export const deleteBook = async (id) => {
    const book = await Book.findByPk(id);
    if (!book) return null;

    await book.destroy();
    return true;
};

export const searchBooks = async (query) => {
    return await Book.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.iLike]: `%${query}%` } },
                { author: { [Op.iLike]: `%${query}%` } },
                { isbn: { [Op.iLike]: `%${query}%` } },
            ],
        },
    });
};
