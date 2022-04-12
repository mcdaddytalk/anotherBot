const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = class BanSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'ban',
            description: 'Bans a user from the server',
            options: [
                { 
                    type: "USER",
                    name: 'member',
                    description: 'The member to ban',
                    required: true
                },
                {  
                    type: "STRING",
                    name: 'reason',
                    description: 'The reason for the ban',
                    required: false
                }
            ]
        });
    }

    async run(client, interaction, args) {

        try {
            interaction.deferReply();
            
            const logChannel = await interaction.guild.channels.cache.find(channel => channel.name === 'bot-logs');
            const member = interaction.options.getMember("member");
            const reason = interaction.options.getString("reason") || "No Reason";
        
            const verifyEmbed = new MessageEmbed()
              .setTitle(`Are you sure you want to ban ${member.user.tag}?`)
              .setColor("#ffff00")
              .setTimestamp();
            const row = new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId("continue")
                .setEmoji("✅")
                .setStyle("PRIMARY"),
              new MessageButton()
                .setCustomId("cancel")
                .setEmoji("❌")
                .setStyle("PRIMARY")
            );
        
            const channel = await interaction.guild.channels.fetch(
              interaction.channelId
            );
        
            const msg = await channel.send({
              embeds: [verifyEmbed],
              components: [row],
            });
        
            const collector = msg.createMessageComponentCollector();
        
            collector.on("collect", (button) => {
              msg.delete();
              switch (button.customId) {
                case "cancel":
                  interaction
                    .editReply(":x: Canceled!")
                    .then((m) => setTimeout(() => m.delete(), 3000));
        
                  break;
        
                case "continue":
                    if (member.bannable) {
                        const embed = new MessageEmbed()
                                    .setTitle("Successfully banned A Member!")
                                    .setDescription(
                            `Member: ${member.user.tag}\nModerator: ${interaction.user.tag}\nReason: ${reason}`
                                )
                                .setTimestamp()
                                .setColor("#00ff00");
                        member.user.send({ embeds: [embed] }).catch(() => {});
                        member.ban({ reason })
                            .then( () => {                                
                                interaction.editReply({ embeds: [embed] });
                                logChannel.send({ embeds: [embed] });
                            }).catch(() => {
                                return interaction
                                    .editReply(`:x: I can't ban this person!`)
                                    .then((m) => setTimeout(() => m.delete(), 3000));
                            });
                    } else {
                        return interaction
                                    .editReply(`:x: I can't ban this person!`)
                                    .then((m) => setTimeout(() => m.delete(), 3000));
                    }
              }
            });
          } catch (e) {
            console.log(e);
          }
    }
}