const dbEnv = {
    development: {
        host: 'localhost',
        username: 'postgres',
        password: '123',
        database: 'lms_bosta_oa',
        dialect: 'postgres',
    },
    test: {
        host: '127.0.0.1',
        username: 'postgres',
        password: '123',
        database: 'lms_bosta_oa_test',
        dialect: 'postgres',
    },
    production: {
        host: '127.0.0.1',
        username: 'postgres',
        password: '123',
        database: 'lms_bosta_oa_prod',
        dialect: 'postgres',
    },
};

export default dbEnv;
