module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('user_items', {
            fields: ['item_id'],
            type: 'foreign key',
            name: 'useritems_item_id_fkey',
            references: {
                table: 'currency_shop',
                field: 'id',
            },
        });

        // await queryInterface.addConstraint('Miners', {
        //     fields: ['user_id'],
        //     type: 'foreign key',
        //     name: 'miners_user_id_fkey',
        //     references: {
        //         table: 'Users',
        //         field: 'user_id',
        //     },
        // });

        // await queryInterface.addConstraint('Miners', {
        //     fields: ['guild_id'],
        //     type: 'foreign key',
        //     name: 'miners_guild_id_fkey',
        //     references: {
        //         table: 'Guilds',
        //         field: 'guild_id',
        //     },
        // });

        await queryInterface.addConstraint('guild_users', {
            fields: ['guild_id'],
            type: 'foreign key',
            name: 'guild_users_guild_id_fkey',
            references: {
                table: 'guilds',
                field: 'id',
            },
        });

        await queryInterface.addConstraint('guild_users', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'guild_users_user_id_fkey',
            references: {
                table: 'users',
                field: 'id',
            },
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('miners', 'miners_user_id_fkey');
        await queryInterface.removeConstraint('miners', 'miners_guild_id_fkey');
        await queryInterface.removeConstraint('guild_users', 'guild_users_guild_id_fkey');
        await queryInterface.removeConstraint('guild_users', 'guild_users_user_id_fkey');
        await queryInterface.removeConstraint('user_items', 'user_items_item_id_fkey');
    },
};
