'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = class Miners extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                guildId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                nextDaily: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                mined: {
                    type: DataTypes.INTEGER,
                },
                dailyAmount: {
                    type: DataTypes.INTEGER,
                },
                createdAt: {
                    type: DataTypes.DATE,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                },
            },
            {
                sequelize,
                modelName: 'miners',
            }
        );
    }
};
