const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { Alarms } = require('../../../database/models');
const ee = require('../../utils/embeds');

module.exports = class ButtonCommand extends BaseCommand {
    constructor() {
        super('alarm', '🎭 Utility Commands', []);
    }

    async run(client, message) {
        const questions = [
            '> What time do you want your alarm at?\nex 00:00 = midnight, 12:00 = noon, 23:59 = 11:59pm',
            '> what days do you want the alarm at?\nType `everyday` for daily, `weekdays` for weekdays, `weekends` for weekends\nOtherwise type the days separated by comma',
            '> what is the alarm for ?(please answer in one word)',
        ];

        let collectCounter = 0;

        const appStartEmbed = new MessageEmbed()
            .setColor(ee.color)
            .setAuthor({
                name: `| Alarm`,
                iconURL: 'https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1',
            })
            .setTitle(`Alarm Setup`)
            .setDescription(questions[collectCounter])
            .setFooter({
                text: ee.footertext,
                iconURL: ee.footericon,
            });
        const filter = m => m.author.id != client.user.id;
        const appStart = await message.author.send({ embeds: [appStartEmbed] });

        const collector = appStart.channel.createMessageCollector({
            filter,
            max: 3,
            time: 60000,
        });

        collector.on('collect', async m => {
            if (collectCounter < questions.length - 1) {
                const question = new MessageEmbed()
                    .setAuthor({
                        name: `| Alarm`,
                        iconURL: 'https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1',
                    })
                    .setTitle(`Alarm Setup`)
                    .setColor(ee.color)
                    .setDescription(questions[++collectCounter])
                    .setFooter({
                        text: ee.footertext,
                        iconURL: ee.footericon,
                    });
                await appStart.edit({ embeds: [question] });
                collector.resetTimer();
                console.log(`Collected ${m.content}`);
            } else {
                await appStart.edit({ content: `> Your alarm is being set`, embeds: [] });
                collector.stop('fulfilled');
            }
        });

        collector.on('end', async (collected, reason) => {
            client.logger.debug(`Alarm collector ended: ${reason}`);
            if (reason === 'time') {
                appStart.edit({ content: `> Your session has timed out.  Try again.`, embeds: [] });
            } else if (reason === 'fulfilled' || reason === 'limit') {
                const mapped = collected.map(msg => {
                    return `${msg.content}`;
                });

                let days = [];
                const t = mapped[0].split(':');
                let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const alarmName = mapped[2];
                const alarmDay = mapped[1];
                let givenDays = [];
                switch (alarmDay) {
                    case 'everyday':
                        days.push(...daysList);
                        break;
                    case 'weekdays':
                        days.push(...daysList.splice(0, 5));
                        break;
                    case 'weekends':
                        days.push(...daysList.slice(0, 1), ...daysList.slice(-1));
                        break;
                    default:
                        givenDays = alarmDay.split(',');
                        days.push(
                            ...givenDays.filter(day => {
                                return daysList.some(d => d === day);
                            })
                        );
                }
                const alarmDB = await Alarms.findOne({
                    where: { alarmName },
                });
                if (alarmDB) {
                    const alreadySet = new MessageEmbed()
                        .setColor(ee.ERROR_EMBED)
                        .setAuthor({
                            name: `| Alarm`,
                            iconURL: 'https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1',
                        })
                        .setTitle(`Alarm Error`)
                        .setDescription(
                            `\`\`\`css
      [There is already Alarm with the name ${alarmName}. Please try again later]
                      \`\`\``
                        )
                        .setTimestamp()
                        .setFooter({
                            text: ee.footertext,
                            iconURL: ee.footericon,
                        });

                    appStart.reply({ embeds: [alreadySet] });
                } else {
                    const alarm = await Alarms.create({
                        alarmId: message.author.id,
                        name: message.author.username,
                        alarmName,
                        alarmTime: {
                            days: days,
                            hour: t[0],
                            minute: t[1],
                        },
                    });
                    const alarmSetEmbed = new MessageEmbed()
                        .setColor(ee.SUCCESS_EMBED)
                        .setDescription('The following settings have been used:')
                        .setTimestamp()
                        .setAuthor({
                            name: `| Alarm`,
                            iconURL: 'https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1',
                        })
                        .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                        .setTitle(`Alarm Set`)
                        .addFields(
                            { name: 'Alarm Name', value: alarmName, inline: true },
                            { name: 'Alarm Time', value: `${t[0]}:${t[1]}`, inline: true },
                            { name: 'Alarm Days', value: alarmDay, inline: true }
                        );
                    alarm.alarmTime = JSON.stringify(alarm.alarmTime);
                    client.alarms.add(alarm);
                    await appStart.reply({ embeds: [alarmSetEmbed] });
                }
            }
        });
    }
};
