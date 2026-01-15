import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception >> ${err.name}: ${err.message}`);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection >> ${err.name}: ${err.message}`);
    server.close(() => process.exit(1));
});
