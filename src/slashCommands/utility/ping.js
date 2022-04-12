const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');

module.exports = class ServerSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'ping', 
            description: 'Replies with Pong!', 
            options: []
        });
    }

    async run(bot, interaction, args) {
        // const msg = await interaction.reply({ content: "Pinging...", fetchReply: true });
        // interaction.editReply({ content: `:ping_pong: Pong! \`${msg.createdTimestamp - interaction.createdTimestamp}ms\` (API: \`${Math.round(client.ws.ping)}ms\`)` });

        interaction.reply({ content: "Pinging...", fetchReply: true })
            .then(inter => interaction.editReply(`:ping_pong: Pong! \`${inter.createdTimestamp - interaction.createdTimestamp}ms\` (API: \`${Math.round(bot.ws.ping)}ms\`)`));

    }
}