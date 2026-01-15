const Borrower = (sequelize, DataTypes) => {
    const Borrower = sequelize.define(
        'Borrower',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'borrowers',
            timestamps: true,
            underscored: true,
        }
    );

    return Borrower;
};

export default Borrower;
