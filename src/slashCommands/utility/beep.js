const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');

module.exports = class BeepSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'beep',
            description: 'Replies with Boop!',
            options: [],
        });
    }

    async run(client, interaction) {
        interaction.reply({ content: `Boop!`, empheral: true });
    }
};
