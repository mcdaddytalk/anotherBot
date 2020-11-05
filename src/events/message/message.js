const BaseEvent = require('../../utils/structures/BaseEvent');
//const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message');
        //this.connection = StateManager.connection;
    }

    async run(client, message) {
        if (message.author.bot) return;
        //const prefix = guildCommandPrefixes.get(message.guild.id);
        const prefix = process.env.DISCORD_BOT_PREFIX;
        const usedPrefix = message.content.slice(0, prefix.length);
        //console.log(prefix);
        //console.log(usedPrefix);

        if (prefix === usedPrefix) {
            const [cmdName, ...cmdArgs] = message.content
                .slice(prefix.length)
                .trim()
                .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs);
            }
        } else {
           // message.channel.send("Prefix not understood");
        }
    }
}
