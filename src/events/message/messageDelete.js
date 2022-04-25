/* eslint-disable id-length */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
// const Time = require("./classes/Time");
// const db = require('quick.db')
module.exports = class MessageDeleteEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'messageDelete', {});
    }

    async run(message) {
        const { mentions } = message;
        // console.log(mentions);
        const currentDate = new Date();
        const diffDate = currentDate.getTime() - message.createdAt.getTime();
        if (hasMentions(mentions) && !selfGhostPing(mentions, message.author.id)) {
            // 15 min
            if (diffDate <= ms('15 min')) {
                const allMentions = getAllMentions(mentions, message.author.id);
                if (allMentions.length > 0) {
                    const ghostPingEmbed = new MessageEmbed()
                        .setDescription(`Ghost Ping from ${message.member}.  Pinged ${allMentions.join(' ')}`)
                        .setTimestamp();
                    await message.channel.send({ embeds: [ghostPingEmbed] });
                }
            }
        }
    }
};

const hasMentions = mentions => mentions.users.size !== 0 || mentions.roles.size !== 0;

const getAllMentions = (mentions, authorId) => {
    const roleMentions = mentions.roles.map(role => role.toString());
    // mentions.users.delete(authorId);
    const filteredUsers = {
        bot: true,
        id: authorId,
    };
    const userMentions = mentions.users
        .filter(u => {
            for (const key in filteredUsers) {
                if (u[key] === undefined || u[key] !== filteredUsers[key]) return false;
            }
            return true;
        })
        .map(user => user.toString());
    return [...roleMentions, ...userMentions];
};

const selfGhostPing = (mentions, authorId) =>
    mentions.roles.size === 0 && mentions.users.size === 1 && mentions.users.has(authorId);
