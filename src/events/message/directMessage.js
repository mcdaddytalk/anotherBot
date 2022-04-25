/* eslint-disable no-unused-vars */
const BaseEvent = require('../../utils/structures/BaseEvent');
// const { MessageEmbed } = require('discord.js');
// const Time = require("./classes/Time");
// const db = require('quick.db')
module.exports = class DirectMessageEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'directMessage', {});
    }

    async run(message) {
        console.log('Inside DM Event');
    }
};
