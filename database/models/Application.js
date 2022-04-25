'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = class Application extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
        // define association here
    }
    static initModel(sequelize) {
        return super.init(
            {
                applicationId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                messageId: {
                    type: DataTypes.STRING,
                },
                authorId: {
                    type: DataTypes.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
            },
            {
                tableName: 'application',
                sequelize,
            }
        );
    }
};
