/* eslint-disable no-console */
const { Client, Collection, Permissions, Intents, WebhookClient } = require('discord.js');
// const Util = require('../clientfn.js');
const logger = require('../logger.js');
const IntervalManager = require('../IntervalManager');
// const { Users } = require('../../../database/models');
const { initCurrency, initAlarms, initMiners } = require('../collections');
const chalk = require('chalk');

const myIntents = new Intents();
myIntents.add(98303);

module.exports = class BaseClient extends Client {
    constructor(config = {}) {
        super({
            allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
            intents: myIntents,
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        });
        this.validate(config);

        // Logger
        this.logger = logger;

        this.config = config;
        this.debug = config.botSettings.debug;
        // this.sequelize = require('../../database/sequelize');
        this.cooldowns = new Collection();
        this.warns = new Collection();
        this.currency = initCurrency(this);
        this.alarms = initAlarms(this);
        this.miners = initMiners(this);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.events = new Collection();
        this.slashCommands = new Collection();
        this.cachedMessageReactions = new Collection();
        this.prefix = config.getPrefix();
        this.name = config.getBotName();
        this.version = config.getBotVersion();
        this.devteam = config.getDevTeam();

        this.intervalManager = new IntervalManager(this);

        this.on('error', err => this.logger.error(chalk.bgRed.bold(err)));
        this.on('warn', err => this.logger.warn(chalk.bgYellow.bold(err)));

        this.joinLeaveWebhook = this.config.server.joinLeaveLogs
            ? new WebhookClient({ url: this.config.server.joinLeaveLogs })
            : undefined;
    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

        if (!options.getToken()) throw new Error('You must pass the token for the client.');
        this.token = options.getToken();

        if (!options.getPrefix()) throw new Error('You must pass a prefix for the client.');
        if (typeof options.getPrefix() !== 'string') throw new TypeError('Prefix should be a type of String.');
        this.prefix = options.getPrefix();

        if (!options.getDefaultPerms()) throw new Error('You must pass default perm(s) for the Client.');
        this.defaultPerms = new Permissions(options.getDefaultPerms()).freeze();
    }
};

// const initCurrency = () => {
//     const currency = new Collection();

//     Reflect.defineProperty(currency, 'init', {
//         value: async (id, user) => {
//             currency.set(id, user);
//         },
//     });

//     Reflect.defineProperty(currency, 'add', {
//         value: async (member, amount) => {
//             const { userId, guildId, userName } = member;
//             const id = `${guildId}-${userId}`;
//             const user = currency.get(id);
//             // const [guild_id, user_id] = id.split('-');
//             if (user) {
//                 user.wallet += Number(amount);
//                 return user.save();
//             }
//             // const user_name = await client.members.cache.get(id).displayName;
//             const newUser = await Users.create({
//                 guildId,
//                 userId,
//                 userName,
//                 wallet: amount,
//                 bank: 0,
//             });
//             currency.set(id, newUser);

//             return newUser;
//         },
//     });

//     Reflect.defineProperty(currency, 'withdraw', {
//         value: async (id, amount) => {
//             const user = currency.get(id);
//             if (user) {
//                 user.wallet += Number(amount);
//                 user.bank -= Number(amount);
//                 return user.save();
//             }
//         },
//     });

//     Reflect.defineProperty(currency, 'deposit', {
//         value: async (id, amount) => {
//             const user = currency.get(id);
//             if (user) {
//                 user.wallet -= Number(amount);
//                 user.bank += Number(amount);
//                 return user.save();
//             }
//         },
//     });

//     Reflect.defineProperty(currency, 'getWallet', {
//         value: id => {
//             const user = currency.get(id);
//             return user ? user.wallet : 0;
//         },
//     });

//     Reflect.defineProperty(currency, 'getBank', {
//         value: id => {
//             const user = currency.get(id);
//             return user ? user.bank : 0;
//         },
//     });

//     return currency;
// };
