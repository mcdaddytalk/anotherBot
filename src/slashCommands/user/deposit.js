const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class DepositSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'deposit',
            description: 'Replies with user balance',
            options: [
                {
                    type: 'INTEGER',
                    name: 'amount',
                    description: 'The amount to deposit',
                    required: true,
                },
            ],
        });
    }

    async run(client, interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const id = `${interaction.guild.id}-${target.id}`;
        const user = client.currency.get(id);
        const transferAmount = interaction.options.getInteger('amount');
        if (!user) return interaction.reply(`Sorry ${interaction.user}, you do not have a wallet.`);
        const currentAmount = client.currency.getWallet(id);
        if (transferAmount > currentAmount)
            return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount} in your wallet.`);
        if (transferAmount <= 0)
            return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}.`);
        client.currency.deposit(id, transferAmount);
        const balanceEmbed = new MessageEmbed()
            .setAuthor({ name: `${client.name}`, iconUrl: client.user.displayAvatarURL() })
            .setColor('BLUE')
            .setTitle('The Bank of Provon')
            .setDescription(`${target.username}'s balance is: `)
            .setFields([
                // { name: '\u200b', value: '\u200b', inline: false },
                { name: 'Wallet', value: `${client.currency.getWallet(id)}💰`, inline: true },
                { name: 'Bank', value: `${client.currency.getBank(id)}💰`, inline: true },
            ]);

        interaction.reply({ embeds: [balanceEmbed], empheral: true });
    }
};
