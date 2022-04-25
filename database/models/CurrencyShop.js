'use strict';
const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = class CurrencyShop extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    unique: true,
                },
                cost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    default: 0,
                },
                createdAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.literal('NOW()'),
                },
                updatedAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.literal('NOW()'),
                },
            },
            {
                tableName: 'currency_shop',
                sequelize,
            }
        );
    }
};
