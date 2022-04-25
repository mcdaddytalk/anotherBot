module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('currency_shop', [
            {
                id: 1,
                name: 'JabberWocky',
                cost: 100,
            },
            { id: 2, name: 'Dagger', cost: 1 },
            { id: 3, name: 'Club', cost: 1 },
            {
                id: 4,
                name: 'Short Sword',
                cost: 5,
            },
            { id: 5, name: 'Bow', cost: 5 },
            { id: 6, name: 'Long Sword', cost: 10 },
        ]);
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('currency_shop', null, {});
    },
};
