const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class TopSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'stats',
            description: 'Replies with stats', 
            options: []
        });
    }

    async run(client, interaction, args) {

        const statsEmbed = new MessageEmbed()
        .setAuthor(`${client.name}`, client.user.displayAvatarURL())
            .setColor('RED')
            .setTitle('THE KAOS ISLAND STATS')
            .setDescription('Kills: `111` Deaths: `45`  KD: `2.47`')
            .setFields([
                {name: '\u200b', value: '\u200b', inline: false},
                {name: '🐱 Enemy Kills `49`', value: '\u200b', inline: false},
                {name: '🐻 Wild Kills `1275`', value: '\u200b', inline: false},
                {name: '🐶 Tamed `1`', value: '\u200b', inline: false},
                {name: '⏳ Minutes Played `6355`', value: '\u200b', inline: false}
            ]);

        interaction.reply({ embeds: [statsEmbed], empheral: true });
    }
}