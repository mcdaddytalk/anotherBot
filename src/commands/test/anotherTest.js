const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('test3', 'test', [], [],
    10,
    false,
    true,
    '');
    }

    async run(client, message, args) {

        if(message.content.startsWith(client.prefix + "okay")) {
            let filter = m => m.content.includes("yes")
            message.channel.awaitMessages({ filter })
              .then(collected => console.log(collected.size))
              .catch(collected => console.log(`something wrong occured`));
        }

        const filter = (a) => a.author.id === message.author.id

        const msg1 = await message.channel.send("Question 1: What would you like the title to be?")
        const title = (await msg1.channel.awaitMessages({filter, max: 1})).first().content;
        console.log(title)
        
        const msg2 = await message.channel.send("Question 2: What would you like the description to be?")
        const description = (await msg2.channel.awaitMessages({filter, max: 1})).first().content;
        console.log(description)
        
        const msg3 = await message.channel.send("Question 3: What would you like the colour to be?")
        const color = (await msg3.channel.awaitMessages({filter, max: 1})).first().content;
        console.log(color)
        
        const msg4 = await message.channel.send("Question 4: What channel would you like it to be sent to?")
        const channel_entry = (await msg4.channel.awaitMessages({filter, max: 1})).first().content;
        console.log(channel_entry)
        
        const matches = channel_entry.match(/^<#!?(\d+)>$/);
        
        if (!matches) return
        
        const channelID = matches[1];
        console.log(channelID)
        
        const channel = await client.channels.fetch(channelID);
        console.log(channel)
        
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter(config.main_config.copyright)

        channel.send({
            embeds: [embed]
        })
    }
}