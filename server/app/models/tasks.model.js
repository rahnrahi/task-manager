module.exports = (sequelize, Sequelize) => {
    const Tasks = sequelize.define("tasks", {
        taskId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: Sequelize.TEXT,
        },
        description: {
            type: Sequelize.TEXT,
        },
        priority: {
            type: Sequelize.ENUM('LOW', 'MEDIUM', 'HIGH'),
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('ToDo', 'InProgress', 'Done'),
            allowNull: false,
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    });

    return Tasks;
};
