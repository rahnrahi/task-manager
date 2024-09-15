module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        userId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    });

    return Users;
};
