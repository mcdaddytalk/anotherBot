/* eslint-disable no-console */
const { Client, Collection, Permissions, Intents, WebhookClient } = require('discord.js');
// const Util = require('../clientfn.js');
const logger = require('../logger.js');
const chalk = require('chalk');

const myIntents = new Intents();
myIntents.add(98303);

module.exports = class BaseClient extends Client {

  constructor(config = {}) {
    super({
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
      intents: myIntents,
      partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });
    this.validate(config);

    // Logger
    this.logger = logger;

    this.config = config;
    this.sequelize = require('../../database/sequelize');
    this.cooldowns = new Collection();
    this.warns = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.slashCommands = new Collection();
    this.cachedMessageReactions = new Collection();
    this.prefix = config.getPrefix();
    this.name = config.getBotName();
    this.version = config.getBotVersion();
    this.devteam = config.getDevTeam();

    this.on('error', (err) => this.logger.error(chalk.bgRed.bold(err)));
    this.on('warn', (err) => this.logger.warn(chalk.bgYellow.bold(err)));

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
