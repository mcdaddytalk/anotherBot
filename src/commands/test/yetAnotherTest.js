const BaseCommand = require('../../utils/structures/BaseCommand');
// const { MessageEmbed } = require('discord.js');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('okay', 'test', [], [], 10, false, true, '');
    }

    async run(client, message) {
        if (message.content.startsWith(client.prefix + 'okay')) {
            console.log(message.content);

            let filter = m => m.content.includes('yes') && m.author.id === message.author.id;
            message.channel
                .awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => console.log(collected.size))
                .catch(error => console.log(`something wrong occurred: ${error}`));
        }
    }
};
