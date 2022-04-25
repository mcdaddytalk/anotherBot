const { Collection, MessageEmbed } = require('discord.js');
// const { Users, Alarms } = require('../../../database/models');
const ee = require('../embeds');

module.exports = {
    initAlarms: client => {
        const alarms = new Collection();

        Reflect.defineProperty(alarms, 'init', {
            value: async (id, alarm) => {
                alarms.set(id, alarm);
            },
        });

        Reflect.defineProperty(alarms, 'add', {
            value: async alarm => {
                const { id, alarmId: userId } = alarm;
                const user = `${userId}-${id}`;
                alarms.set(user, alarm);
            },
        });

        Reflect.defineProperty(alarms, 'ring', {
            value: async id => {
                const alarm = alarms.get(id);
                if (alarm) {
                    const user = client.users.cache.get(alarm.alarmId);
                    if (user) {
                        const alarmEmbed = new MessageEmbed()
                            .setColor(ee.SUCCESS_EMBED)
                            .setAuthor({
                                name: `| Alarm`,
                                iconURL: 'https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1',
                            })
                            .setDescription(`Your ${alarm.alarmName} alarm has been triggered!`)
                            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                            .setTimestamp();
                        user.send({ embeds: [alarmEmbed] });
                    }
                }
            },
        });

        return alarms;
    },
};
