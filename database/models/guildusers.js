'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
module.exports = class GuildUsers extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                userId: DataTypes.INTEGER,
                guildId: DataTypes.INTEGER,
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
                sequelize,
                modelName: 'guild_users',
            }
        );
    }
};
