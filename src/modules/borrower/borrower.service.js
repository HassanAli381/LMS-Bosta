import { Borrower } from '../index.models.js';
import bcrypt from 'bcrypt';

export const registerBorrower = async (data) => {
    let encryptedPassword = '';
    if (data.password) {
        encryptedPassword = await bcrypt.hash(data?.password, 10);
        data.password = encryptedPassword;
    }

    const newBorrower = await Borrower.create(data);
    return newBorrower;
};

export const getAllBorrowers = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await Borrower.findAndCountAll({
        limit,
        offset,
        order: [['created_at', 'DESC']],
    });
};

export const getBorrowerById = async (id) => {
    return await Borrower.findByPk(id);
};

export const getBorrowerByEmail = async (email) => {
    return await Borrower.findOne({
        where: {
            email,
        },
    });
};

export const updateBorrower = async (id, data) => {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) return null;

    return await borrower.update(data);
};

export const deleteBorrower = async (id, data) => {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) return null;

    await borrower.destroy();
    return true;
};
