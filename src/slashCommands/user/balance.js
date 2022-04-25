const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class BalanceSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'balance',
            description: 'Replies with user balance',
            options: [
                {
                    type: 'USER',
                    name: 'member',
                    description: 'The member to get balance of',
                    required: false,
                },
            ],
        });
    }

    async run(client, interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const id = `${interaction.guild.id}-${target.id}`;
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
