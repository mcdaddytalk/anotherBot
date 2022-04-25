const dotenv = require('dotenv').config({ debug: process.env.DEBUG });
const { displayName, version } = require('../../package.json');

class Config {
    config = {};

    devteam = ['664499234900410376'];
    defaultPerms = ['SEND_MESSAGES', 'VIEW_CHANNEL'];
    botSettings = {
        debug: true,
        anti_crash_logs: true,
        ratelimit_logs: true,
        debug_discordjs_logs: true,
        show_serverjoins: true,
        show_loaded_commands: false,
        show_loaded_slashcommands: false,
        show_loaded_events: false,
    };
    server = {
        errorLogs: process.env.ERROR_LOGS,
        joinLeaveLogs: process.env.JOIN_LEAVE_LOGS,
    };

    constructor() {
        this.config = dotenv.parsed;
    }

    getPrefix = () => {
        return this.config.DISCORD_BOT_PREFIX;
    };

    getToken = () => {
        return this.config.DISCORD_BOT_TOKEN;
    };

    getBotName = () => {
        return displayName;
    };

    getBotVersion = () => {
        return version;
    };

    getDevTeam = () => {
        return this.devteam;
    };

    getDefaultPerms = () => {
        return this.defaultPerms;
    };

    getDBConfig = env => {
        switch (env) {
            case 'development':
                return {
                    dialect: 'mysql',
                    database: process.env.MARIADB_DB_NAME || 'miner',
                    username: process.env.MARIADB_DB_USERNAME || 'root',
                    password: process.env.MARIADB_DB_PASSWORD || 'root',
                    host: process.env.MARIADB_DB_HOST || 'localhost',
                    port: parseInt(process.env.MARIADB_DB_PORT || '3306'),
                };
            case 'production':
                return {
                    dialect: 'mysql',
                    database: process.env.MARIADB_DB_NAME,
                    username: process.env.MARIADB_DB_USERNAME,
                    password: process.env.MARIADB_DB_PASSWORD,
                    host: process.env.MARIADB_DB_HOST,
                    port: parseInt(process.env.MARIADB_DB_PORT),
                };
            case 'test':
                return {
                    dialect: 'mysql',
                    database: process.env.MARIADB_DB_NAME || 'miner',
                    username: process.env.MARIADB_DB_USERNAME || 'root',
                    password: process.env.MARIADB_DB_PASSWORD || 'root',
                    host: process.env.MARIADB_DB_HOST || 'localhost',
                    port: parseInt(process.env.MARIADB_DB_PORT || '3306'),
                };
            default:
                return {};
        }
    };
}

module.exports = Config;
