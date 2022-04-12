const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = class ButtonCommand extends BaseCommand {
    constructor() {
        super('button2', 'components', []);
    }

    async run(client, message, args) {

      const button_1 = new MessageButton()
        .setCustomId('Right')
        .setEmoji("➡️")
        .setStyle('PRIMARY');

      const button_2 = new MessageButton()
        .setCustomId('Left')
        .setEmoji("⬅️")
        .setStyle('PRIMARY');

      const button_3 = new MessageButton()
        .setCustomId('Stop')
        .setEmoji('<a:stop:851111621433491467>')
        .setStyle('PRIMARY')

      const row = new MessageActionRow( {components: [button_2, button_3, button_1], type: "BUTTON" } );
      let page = 0;
      const pages = [
        new MessageEmbed().setTitle('Page 1').setDescription('This is page 1'),
        new MessageEmbed().setTitle('Page 2').setDescription('This is page 2'),
        new MessageEmbed().setTitle('Page 3').setDescription('This is page 3'),
        new MessageEmbed().setTitle('Page 4').setDescription('This is page 4')
      ];


      let helpMsg = await message.channel.send({ embeds: [pages[page]], components: [row]})


      const filter = (interaction) => interaction.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({
        filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
        time: 180e3
      });
      //console.log(collector)
      collector.on("collect", async(b) => {
        try {
          if (b.isButton()) {
            if (b.user.id !== message.author.id)
              return b.reply({
                content: "ERROR: You can't interact with this message",
                ephemeral: true
              });
            switch(b.customId) {
              case 'Left':
                if (page !== 0) {
                  page -= 1;
                  
                } else {
                  page = pages.length - 1;
                }
                break;
              case 'Right':
                if (page < pages.length - 1) {
                  page++;  
                } else {
                  page = 0;
                }
                break;
              case 'Stop':
                await b.update({ content: 'Stopped', components: [] })
                collector.stop()
                break;
            }
            await helpMsg.edit({
              embeds: [pages[page]],
              components: [row]
            }).catch(e => {})
            b.deferUpdate().catch(e => {})
          }
        } catch (e) {
          console.log(e.stack ? String(e.stack) : String(e))
          console.log(String(e))
        }
      });
      collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
      });
    }
}