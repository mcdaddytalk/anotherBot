const BaseEvent = require('../../utils/structures/BaseEvent');
const { Guilds } = require('../../../database/models');
const { MessageEmbed } = require('discord.js');
const ee = require('../../utils/embeds');

//const StateManager = require('../../utils/StateManager');

// const guildCommandPrefixes = new Map();
module.exports = class MessageEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'messageCreate', { once: false });
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return this.client.emit('directMessage', message);
        const member = {
            userId: message.author.id,
            guildId: message.guild.id,
            userName: message.author.username,
        };
        this.client.currency.add(member, 1);

        const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

        if (!this.client.application?.owner) await this.client.application?.fetch();
        const guild = await Guilds.findOne({ where: { guildId: message.guild.id } });

        const prefix = message.content.match(mentionRegexPrefix)
            ? message.content.match(mentionRegexPrefix)[0]
            : guild?.guildPrefix || this.client.prefix;

        if (message.content.match(mentionRegex)) {
            if (message.mentions.users.first()) {
                if (message.mentions.users.first().tag === this.client.user.tag) {
                    const botPinged = new MessageEmbed()
                        .setAuthor({
                            name: `${this.client.user.username}`,
                            iconURL: message.guild.iconURL({ dynamic: true }),
                        })
                        .setThumbnail(this.client.user.displayAvatarURL())
                        .setColor(ee.TRANSPARENT_EMBED)
                        .setDescription(
                            `**HI!  I am ${this.client.user.username}!\nMy current prefix is: \`${prefix}\`\nUse \`${prefix}help\` to see what else I can do**.`
                        )
                        .setTimestamp()
                        .setFooter({ text: ee.footertext, iconURL: ee.footericon });
                    message.channel.send({ embeds: [botPinged] });
                    message.delete();
                    return;
                }
            }
        }
        //const prefix = guildCommandPrefixes.get(message.guild.id);
        const usedPrefix = message.content.slice(0, prefix.length);
        //console.log(prefix);
        //console.log(usedPrefix);

        if (prefix === usedPrefix) {
            const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).trim().split(/\s+/);
            const command = this.client.commands.get(cmdName);
            if (command) {
                command.run(this.client, message, cmdArgs);
            }
        }
    }
};
