const { Collection } = require('discord.js');
const { Users } = require('../../../database/models');

module.exports = {
    initCurrency: () => {
        const currency = new Collection();

        Reflect.defineProperty(currency, 'init', {
            value: async (id, user) => {
                currency.set(id, user);
            },
        });

        Reflect.defineProperty(currency, 'add', {
            value: async (member, amount) => {
                const { userId, guildId, userName } = member;
                const id = `${guildId}-${userId}`;
                const user = currency.get(id);
                // const [guild_id, user_id] = id.split('-');
                if (user) {
                    user.wallet += Number(amount);
                    return user.save();
                }
                // const user_name = await client.members.cache.get(id).displayName;
                const newUser = await Users.create({
                    guildId,
                    userId,
                    userName,
                    wallet: amount,
                    bank: 0,
                });
                currency.set(id, newUser);

                return newUser;
            },
        });

        Reflect.defineProperty(currency, 'withdraw', {
            value: async (id, amount) => {
                const user = currency.get(id);
                if (user) {
                    user.wallet += Number(amount);
                    user.bank -= Number(amount);
                    return user.save();
                }
            },
        });

        Reflect.defineProperty(currency, 'deposit', {
            value: async (id, amount) => {
                const user = currency.get(id);
                if (user) {
                    user.wallet -= Number(amount);
                    user.bank += Number(amount);
                    return user.save();
                }
            },
        });

        Reflect.defineProperty(currency, 'getWallet', {
            value: id => {
                const user = currency.get(id);
                return user ? user.wallet : 0;
            },
        });

        Reflect.defineProperty(currency, 'getBank', {
            value: id => {
                const user = currency.get(id);
                return user ? user.bank : 0;
            },
        });

        return currency;
    },
};
