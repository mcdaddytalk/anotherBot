'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = class Users extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                userId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                guildId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                },
                wallet: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    default: 0,
                },
                bank: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    default: 0,
                },
            },
            {
                sequelize,
                modelName: 'users',
            }
        );
    }
};
