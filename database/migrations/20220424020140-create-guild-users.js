'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('guild_users', {
            guildId: {
                type: DataTypes.INTEGER,
                field: 'guild_id',
                primaryKey: true,
            },
            id: {
                type: DataTypes.INTEGER,
                field: 'id',
            },
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id',
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
        await queryInterface.dropTable('guild_users');
    },
};
