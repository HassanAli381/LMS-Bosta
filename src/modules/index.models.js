import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from './../config/db.js';
import BookModel from './book/book.model.js';
import BorrowerModel from './borrower/borrower.model.js';
import BorrowingModel from './Borrowing/Borrowing.model.js';

const env = 'development';
const dbEnv = dbConfig[env];

export const sequelize = new Sequelize(dbEnv.database, dbEnv.username, dbEnv.password, {
    host: dbEnv.host,
    dialect: dbEnv.dialect,
    logging: false,
});

export const Book = BookModel(sequelize, DataTypes);
export const Borrower = BorrowerModel(sequelize, DataTypes);
export const Borrowing = BorrowingModel(sequelize, DataTypes);

Borrower.hasMany(Borrowing, {
    foreignKey: 'borrowerId',
});
Borrowing.belongsTo(Borrower, {
    foreignKey: 'borrowerId',
});

Book.hasMany(Borrowing, {
    foreignKey: 'bookId',
});
Borrowing.belongsTo(Book, {
    foreignKey: 'bookId',
});

const dbConnection = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB connected & synced');
};

export default dbConnection;
