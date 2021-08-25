const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("schedule", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
}

