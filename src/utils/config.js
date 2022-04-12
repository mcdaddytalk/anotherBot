const dotenv = require('dotenv').config({ debug: process.env.DEBUG });
const { displayName, version } = require('../../package.json');

class Config {

  config = {};

  devteam = ["664499234900410376"];
  defaultPerms = ["SEND_MESSAGES","VIEW_CHANNEL"];
  botSettings = {
    debug: true, 
    anti_crash_logs: true,
    ratelimit_logs: true,
    debug_discordjs_logs: true,
    show_serverjoins: true,
    show_loaded_commands: false,
    show_loaded_slashcommands: false,
    show_loaded_events: false
  }
  server = {
    errorLogs: process.env.ERROR_LOGS,
    joinLeaveLogs: process.env.JOIN_LEAVE_LOGS
  }

  
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
  }

  getBotVersion = () => {
    return version;
  }

  getDevTeam = () => {
    return this.devteam;
  }

  getDefaultPerms = () => {
    return this.defaultPerms;
  }
}

module.exports = Config;