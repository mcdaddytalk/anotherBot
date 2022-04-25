require('dotenv').config();
const colors = require('colors');
colors.enable();
const BaseClient = require('./utils/structures/BaseClient');
const { registerCommands, registerEvents, registerSlashCommands } = require('./utils/registry');
const discordModals = require('discord-modals'); // Define the discord-modals package!
const Config = require('./utils/config');
const config = new Config();
const db = require('./db')(config);
const { initModels } = require('../database/models');

const client = new BaseClient(config);
discordModals(client);

(async () => {
    await initModels(db);
    client.sequelize = db;
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await registerSlashCommands(client, '../slashCommands');
    await client.login(config.getToken());
})();
