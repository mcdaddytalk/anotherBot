'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = class UserItems extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                guild_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                user_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                item_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: 'compositeIndex',
                },
                amount: {
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
                tableName: 'user_items',
                sequelize,
            }
        );
    }
};
