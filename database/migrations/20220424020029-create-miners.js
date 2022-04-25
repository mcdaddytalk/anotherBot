'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('miners', {
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id',
                allowNull: false,
            },
            guildId: {
                type: DataTypes.INTEGER,
                field: 'guild_id',
                allowNull: false,
            },
            nextDaily: {
                type: DataTypes.DATE,
                field: 'next_daily',
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            mined: {
                type: DataTypes.INTEGER,
                field: 'mined',
            },
            dailyAmount: {
                type: DataTypes.INTEGER,
                field: 'daily_amount',
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
        await queryInterface.dropTable('miners');
    },
};
