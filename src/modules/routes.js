import booksRouter from './book/book.routes.js';
import borrowersRotuer from './borrower/borrower.routes.js';
import borrowingsRotuer from './Borrowing/Borrowing.routes.js';
import authRouter from './auth/auth.routes.js';

const mountRoutes = (app) => {
    app.use('/api/books', booksRouter);
    app.use('/api/borrowers', borrowersRotuer);
    app.use('/api/borrowing', borrowingsRotuer);
    app.use('/api/auth', authRouter);
};

export default mountRoutes;
