const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = class CustomEmbedSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'myembed', 
            description: 'Sends embed to selected channel', 
            options: [
                {
                    type: "CHANNEL",
                    name: 'Channel',
                    description: 'Channel to send to',
                    required: true
                },
                {
                    type: "STRING",
                    name: 'Title',
                    description: 'Title of embed',
                    required: true
                },
                {
                    type: "STRING",
                    name: 'Description',
                    description: 'Description of embed',
                    required: true
                }
            ]
        });
    }

    async run(client, interaction, args) {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({
            content: "Você não tem permissões para isso!",
            ephemeral: true
        });
        
        const channelselect = interaction.options.getChannel('canal');
        const titulo = interaction.options.getString('título');
        const descricao = interaction.options.getString('descrição');

        if (!['GUILD_TEXT', 'GUILD_ANNOUCEMENTS'].includes(channelselect.type)) return interaction.reply({
            content: "Você não selecionou um canal válido!",
            ephemeral: true
        });
          
        const embedresult = new MessageEmbed()
            .setFooter("Embed feito por " + interaction.user.tag)
            .setTitle(titulo)
            .setDescription(descricao);
        
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('confirmar')
                    .setLabel('Confirmar')
                    .setStyle('SUCCESS'),
            );  
          
        interaction.reply({
            content: "Preview, para enviar clique no botão verde!", embeds: [embedresult],
            ephemeral: true,
            components: [row]
        });

        const filter = i => i.customId === 'confirmar';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });
        collector.on('collect', async i => {
            if (i.customId === 'confirmar') {
                await channelselect.send({embeds: [embedresult]})
                await i.update({content: "Enviei!", embeds: [], components: []})
            }
        });
    }
}