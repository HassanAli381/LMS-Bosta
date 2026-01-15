const Book = (sequelize, DataTypes) => {
    const Book = sequelize.define(
        'Book',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            isbn: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                },
            },

            shelfLocation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'books',
            timestamps: true,
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ['isbn'],
                },
                {
                    fields: ['title'],
                },
                {
                    fields: ['author'],
                },
            ],
        }
    );

    return Book;
};

export default Book;
