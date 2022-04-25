const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');

module.exports = class PaySlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'pay',
            description: 'Replies with user inventory',
            options: [
                {
                    type: 'USER',
                    name: 'member',
                    description: 'The member to pay',
                    required: true,
                },
                {
                    type: 'INTEGER',
                    name: 'amount',
                    description: 'The amount to pay',
                    required: true,
                },
            ],
        });
    }

    async run(client, interaction) {
        const currentAmount = client.currency.getWallet(interaction.user.id);
        const transferAmount = interaction.options.getInteger('amount');
        const transferTarget = interaction.options.getUser('user');

        if (transferAmount > currentAmount)
            return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount}.`);
        if (transferAmount <= 0)
            return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}.`);
        const payor = {
            user_id: interaction.user.id,
            guild_id: interaction.guild.id,
            user_name: interaction.user.username,
        };
        const payee = {
            user_id: transferTarget.id,
            guild_id: transferTarget.guild.id,
            user_name: transferTarget.user.username,
        };
        client.currency.add(payor, -transferAmount);
        client.currency.add(payee, transferAmount);

        return interaction.reply({
            content: `Successfully transferred ${transferAmount}💰 to ${
                transferTarget.tag
            }. Your current balance is ${client.currency.getWallet(interaction.user.id)}💰`,
            ephemeral: true,
        });
    }
};
