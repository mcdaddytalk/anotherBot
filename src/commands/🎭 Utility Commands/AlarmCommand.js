const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { Alarm } = require('../../database/models');

module.exports = class ButtonCommand extends BaseCommand {
    constructor() {
        super('alarm', '🎭 Utility Commands', []);
    }

    async run(client, message, args) {
      const questions = [
        '> What time do you want your alarm at?',
        '> what days do you want the alarm at? If you want it for everyday, please type `everyday`',
        '> what is the alarm for ?(please answer in one word)'
      ];

      let collectCounter = 0;

      
      const appStartEmbed = new MessageEmbed()
          .setColor('#ff9a00')
          .setAuthor({
              name: `| Alarm`,
              iconURL: "https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1"})
          .setDescription(questions[collectCounter])
          .setFooter({
              text: 'Provon | Alarm',
              iconURL: message.guild.iconURL()});
      const filter = m => m.author.id != client.user.id;
      const appStart = await message.author.send({ embeds: [ appStartEmbed ] });
      
      const collector = appStart.channel.createMessageCollector({ filter, max: 3, time: 60000 });

      collector.on('collect', async m => {
          if (collectCounter < questions.length - 1) {
              const question = new MessageEmbed()
                  .setAuthor({
                          name: `| Alarm`,
                          iconURL: "https://cdn.discordapp.com/emojis/845227487364775967.gif?v=1"})
                  .setColor('#ff9a00')
                  .setDescription(questions[++collectCounter])
                  .setFooter({
                      text: 'Provon | Alarm',
                      iconURL: message.guild.iconURL()});
              await appStart.channel.send({ embeds: [ question ] });
              console.log(`Collected ${m.content}`)
          } else {
              appStart.channel.send(`> Your alarm would be set`);
              collector.stop('fulfilled');
          }
      });

      collector.on('end', async (collected, reason) => {
          if (reason === 'fulfilled') {
              const mapped = collected.map(msg => {
                      return `${msg.content}`;
              });
              
              let days = [];
              const t = await mapped[0].split(':');
              let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const name = await mapped[2];
              const alarmDay = await mapped[1];
              if(alarmDay.length > 10){
                      const alarmDaySlices = await alarmDay.split(',');
                      for(const alarmDaySlice of alarmDaySlices){
                          await days.push(daysList.find(function findDay(list) {return list == alarmDaySlice;},Array, alarmDaySlice));
                      }
              }
              if(alarmDay !== "everyday") await days.push(daysList.find(function findDay(list) {return list == alarmDay;},Array,alarmDay));
              if(alarmDay === "everyday") await days.push(daysList);
              const alarmDB = await Alarm.findOne({ alarmName : name });
              if(alarmDB){
                      const alreadySet = new MessageEmbed()
                      .setColor("#2f3136")
                      .setDescription(`\`\`\`css
      [There is already Alarm with the name ${name}. Please try again later]
                      \`\`\``)
                      setFooter({
                          text: 'Provon | Alarm',
                          iconURL: message.guild.iconURL()});

                      message.reply({ embeds: [ alreadySet ] });
              }else{
                  const a = await Alarm.create({
                      id : message.author.id,
                      name : message.author.username,
                      alarmName : name,
                      alarmTime : {
                          days : days,
                          hour : t[0],
                          minute : t[1]
                      }
                  });
                  setTimeout(async () => {
                      const date = new Date();
                      const alarmDaySlices2 = await a.alarmTime.days;
                      const alarmh = await a.alarmTime.hour;
                      const alarmm = await a.alarmTime.minute;
                      for(const alarmDaySlice2 of alarmDaySlices2){
                          console.log(alarmh);
                          console.log(alarmm);
                      }
                  }, 60000);
              }
          }
      });
    }
}