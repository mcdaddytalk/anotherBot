const { Collection } = require('discord.js');
// const { Users } = require('../../../database/models');

module.exports = {
    initMiners: () => {
        const miners = new Collection();

        Reflect.defineProperty(miners, 'init', {
            value: async (id, miner) => {
                miners.set(id, miner);
            },
        });

        return miners;
    },
};
