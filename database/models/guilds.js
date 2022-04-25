'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = class Guilds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                guildId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                guildName: {
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
                guildPrefix: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: '!',
                },
                license: {
                    type: DataTypes.STRING,
                },
                key: {
                    type: DataTypes.STRING,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
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
                modelName: 'guilds',
            }
        );
    }
};
