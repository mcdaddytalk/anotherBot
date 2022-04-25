'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_items', {
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
        await queryInterface.dropTable('user_tems');
    },
};
