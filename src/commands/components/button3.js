const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = class ButtonCommand extends BaseCommand {
    constructor() {
        super('button3', 'components', []);
    }

    async run(client, message) {
        const buttons = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('Button-claim').setEmoji('✋').setLabel('Claim').setStyle('SUCCESS'),
            new MessageButton().setCustomId('Button-cancel').setEmoji('❌').setLabel('Cancel').setStyle('DANGER')
        );
        const emb = new MessageEmbed()
            .setColor('#FB8C00')
            // .setFooter('This is a footer', 'https://i.imgur.com/wSTFkRM.png')
            .setFooter(`Ticket created by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('A staff member will get back to you soon!')
            .setTitle(`:ticket: Ticket #${100 + 1}`);

        // const msg = await message.channel.send({ embeds: [emb], components: [buttons] });
        message.channel.send({ embeds: [emb], components: [buttons] });
    }
};
