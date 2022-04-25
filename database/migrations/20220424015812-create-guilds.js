'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('guilds', {
            guildId: {
                type: DataTypes.STRING,
                field: 'guild_id',
                allowNull: false,
                unique: true,
            },
            guildName: {
                type: DataTypes.STRING,
                field: 'guild_name',
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
            guildPrefix: {
                type: DataTypes.STRING,
                field: 'guild_prefix',
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
                defaultValue: false,
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
        await queryInterface.dropTable('guilds');
    },
};
