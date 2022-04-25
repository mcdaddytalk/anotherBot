module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('miners', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'miners_user_id_fkey',
            references: {
                table: 'users',
                field: 'id',
            },
        });

        await queryInterface.addConstraint('miners', {
            fields: ['guild_id'],
            type: 'foreign key',
            name: 'miners_guild_id_fkey',
            references: {
                table: 'guilds',
                field: 'id',
            },
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('miners', 'miners_user_id_fkey');
        await queryInterface.removeConstraint('miners', 'miners_guild_id_fkey');
    },
};
