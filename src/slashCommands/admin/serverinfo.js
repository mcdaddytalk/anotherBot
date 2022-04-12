const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');

module.exports = class ServerSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'server',
            description: 'Replies with guild information',
            options: []
        });
    }

    async run(client, interaction, args) {
        interaction.reply({ content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`, empheral: true });
    }
}