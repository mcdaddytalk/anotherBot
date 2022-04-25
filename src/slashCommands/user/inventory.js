const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { Users } = require('../../../database/models');

module.exports = class BalanceSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'inventory',
            description: 'Replies with user inventory',
            options: [
                {
                    type: 'USER',
                    name: 'member',
                    description: 'The member to get inventory of',
                    required: false,
                },
            ],
        });
    }

    async run(client, interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return interaction.reply(`${target.username} has no items.`);

        interaction.reply({
            content: `${target.username} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(',\n')}`,
            empheral: true,
        });
    }
};
