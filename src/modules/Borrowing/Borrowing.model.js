const Borrowing = (sequelize, DataTypes) => {
    const Borrowing = sequelize.define(
        'Borrowing',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            borrowerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            bookId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            borrowedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            returnedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    );

    return Borrowing;
};

export default Borrowing;
