const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = class ButtonCommand extends BaseCommand {
    constructor() {
        super('button', 'components', []);
    }

    async run(client, message) {
        const startEmbed = new MessageEmbed()
            .setTitle('Character Gen')
            .setDescription('To begin, press `Start`\nYou can exit at any time by pressing `Cancel`');
        const genderEmbed = new MessageEmbed()
            .setTitle('Character Gen - Gender')
            .setDescription('Pick a gender:\nPress `Cancel` to exit');
        const classEmbed = new MessageEmbed()
            .setTitle('Character Gen - Class')
            .setDescription('Pick a class:\nPress `Cancel` to exit');

        const getSaveEmbed = (charGender, charClass) => {
            return new MessageEmbed()
                .setTitle('Character Gen - Save')
                .setDescription(
                    `Here are your selected choices:\nGender:  ${charGender}\nClass:  ${charClass}\nPress \`Save\` to finalize selections\nOr Press \`Cancel\` to exit`
                );
        };

        const start = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('start').setLabel('Start').setStyle('SUCCESS'),
            new MessageButton().setCustomId('cancel').setLabel('Cancel').setStyle('DANGER')
        );
        const genderRow = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('maleButton').setLabel('Male').setStyle('PRIMARY'),
            new MessageButton().setCustomId('femaleButton').setLabel('Female').setStyle('SECONDARY'),
            new MessageButton().setCustomId('cancel').setLabel('Cancel').setStyle('DANGER')
        );
        const classRow = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('fighterButton').setLabel('Fighter').setStyle('SECONDARY'),
            new MessageButton().setCustomId('rogueButton').setLabel('Rogue').setStyle('SECONDARY'),
            new MessageButton().setCustomId('mageButton').setLabel('Mage').setStyle('SECONDARY'),
            new MessageButton().setCustomId('priestButton').setLabel('Priest').setStyle('SECONDARY'),
            new MessageButton().setCustomId('cancel').setLabel('Cancel').setStyle('DANGER')
        );
        const saveRow = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('save').setLabel('Save').setStyle('SUCCESS'),
            new MessageButton().setCustomId('cancel').setLabel('Cancel').setStyle('DANGER')
        );
        message.channel.send({
            embeds: [startEmbed],
            components: [start],
        });

        const filter = interaction => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: 'BUTTON',
            time: 60000,
        });

        let charGender = 'unknown';
        let charClass = 'unknown';

        const saveGender = value => (charGender = value);
        const saveClass = value => (charClass = value);

        collector.on('collect', async interaction => {
            let saveEmbed;
            switch (interaction.customId) {
                case 'start':
                    await interaction.update({ embeds: [genderEmbed], components: [genderRow] });
                    break;
                case 'cancel':
                    await interaction.update({
                        content: 'Character generation canceled by user',
                        embeds: [],
                        components: [],
                    });
                    break;
                case 'save':
                    await interaction.update({ content: 'Character generation saved!', embeds: [], components: [] });
                    break;
                case 'maleButton':
                    saveGender('Male');
                    await interaction.update({ embeds: [classEmbed], components: [classRow] });
                    break;
                case 'femaleButton':
                    saveGender('Female');
                    await interaction.update({ embeds: [classEmbed], components: [classRow] });
                    break;
                case 'fighterButton':
                    saveClass('Fighter');
                    saveEmbed = getSaveEmbed(charGender, charClass);
                    await interaction.update({ embeds: [saveEmbed], components: [saveRow] });
                    break;
                case 'rogueButton':
                    saveClass('Rogue');
                    saveEmbed = getSaveEmbed(charGender, charClass);
                    await interaction.update({ embeds: [saveEmbed], components: [saveRow] });
                    break;
                case 'mageButton':
                    saveClass('Mage');
                    saveEmbed = getSaveEmbed(charGender, charClass);
                    await interaction.update({ embeds: [saveEmbed], components: [saveRow] });
                    break;
                case 'priestButton':
                    saveClass('Priest');
                    saveEmbed = getSaveEmbed(charGender, charClass);
                    await interaction.update({ embeds: [saveEmbed], components: [saveRow] });
                    break;
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
};
