'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            userId: {
                type: DataTypes.STRING,
                field: 'user_id',
                allowNull: false,
            },
            guildId: {
                type: DataTypes.STRING,
                field: 'guild_id',
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                field: 'user_name',
                allowNull: false,
            },
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            wallet: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            bank: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            },
        });
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
