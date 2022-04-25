const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = class SelectCommand extends BaseCommand {
    constructor() {
        super('select', 'components', []);
    }

    async run(client, message) {
        const content = 'Mason is looking for new arena partners. What classes do you play?';
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('class_select_drop')
                .setMinValues(1)
                .setMaxValues(3)
                .setPlaceholder('Choose a class')
                .addOptions([
                    {
                        label: 'Rogue',
                        value: 'rogue',
                        description: 'Sneak n stab',
                        emoji: {
                            name: 'rogue',
                            id: '625891304148303894',
                        },
                    },
                    {
                        label: 'Mage',
                        value: 'mage',
                        description: "Turn 'em into a sheep",
                        emoji: {
                            name: 'mage',
                            id: '625891304081063986',
                        },
                    },
                    {
                        label: 'Priest',
                        value: 'priest',
                        description: "You get heals when I'm done doing damage",
                        emoji: {
                            name: 'priest',
                            id: '625891303795982337',
                        },
                    },
                ])
        );
        message.channel.send({
            content,
            components: [row],
        });
    }
};
