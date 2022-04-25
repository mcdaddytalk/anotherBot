const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class TopSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'top',
            description: 'Replies with top ten leaderboard',
            options: [],
        });
    }

    async run(client, interaction) {
        const leaderboard = [
            {
                name: 'lulu',
                kills: 236,
                deaths: 17,
                kd: 13.88,
            },
            {
                name: 'ICY',
                kills: 212,
                deaths: 75,
                kd: 2.83,
            },
            {
                name: 'JimmyLong',
                kills: 212,
                deaths: 67,
                kd: 2.94,
            },
            {
                name: 'Vayne Insane',
                kills: 197,
                deaths: 22,
                kd: 7.09,
            },
            {
                name: 'LocuritasKillUgia',
                kills: 156,
                deaths: 74,
                kd: 2.08,
            },
            {
                name: 'nodata',
                kills: 0,
                deaths: 0,
                kd: 0.0,
            },
        ];
        const topEmbed = new MessageEmbed()
            .setTitle('🏆 THE LEADERBOARD')
            .setColor('DARK_GOLD')
            .setDescription(
                leaderboard
                    .map(
                        (item, i) =>
                            `\`${++i}  ${item.name.padEnd(20)} ${item.kills
                                .toString()
                                .padStart(3, ' ')} kills ${item.deaths.toString().padStart(3, ' ')} deaths ${item.kd
                                .toString()
                                .padStart(5, ' ')} KD\``
                    )
                    .join('\n')
            );
        interaction.reply({ embeds: [topEmbed], empheral: true });
    }
};
