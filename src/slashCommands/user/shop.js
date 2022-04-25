const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { Formatters } = require('discord.js');
const { CurrencyShop } = require('../../../database/models');

module.exports = class ShopSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'shop',
            description: 'Replies with shop inventory',
            options: [],
        });
    }

    async run(client, interaction) {
        const items = await CurrencyShop.findAll();
        return interaction.reply({
            content: Formatters.codeBlock(items.map(i => `${i.name}: ${i.cost}💰`).join('\n')),
            ephemeral: true,
        });
    }
};
