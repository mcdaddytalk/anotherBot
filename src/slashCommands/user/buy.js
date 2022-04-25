const { Op } = require('sequelize');
const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { Users, CurrencyShop } = require('../../../database/models');

module.exports = class BalanceSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'buy',
            description: 'Replies with user inventory',
            options: [
                {
                    type: 'STRING',
                    name: 'item',
                    description: 'The item to buy',
                    required: true,
                },
            ],
        });
    }

    async run(client, interaction) {
        // const { currency } = client;
        const itemName = interaction.options.getString('item');
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });
        const id = `${interaction.guild.id}-${interaction.user.id}`;
        if (!item) return interaction.reply(`That item doesn't exist.`);
        const currentAmount = client.currency.getWallet(id);
        if (item.cost > currentAmount) {
            return interaction.reply(`You currently have ${currentAmount}, but the ${item.name} costs ${item.cost}!`);
        }

        const user = await Users.findOne({ where: { user_id: interaction.user.id } });
        // console.log(user instanceof Users);
        const member = {
            userId: interaction.user.id,
            guildId: interaction.guild.id,
            userName: interaction.user.username,
        };
        client.currency.add(member, -item.cost);
        await user.addItem(item);

        return interaction.reply({ content: `You've bought: ${item.name}.`, ephemeral: true });
    }
};
