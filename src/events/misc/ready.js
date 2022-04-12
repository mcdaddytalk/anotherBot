const BaseEvent = require('../../utils/structures/BaseEvent');
//const StateManager = require('../../utils/StateManager');
const { Application, Guild, Alarm } = require('../../database/models');

//const guildCommandPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'ready', { once: true });
    }

    async run() {
        await this.client.sequelize.authenticate()
            .then( () => {
                this.client.logger.success('Connection has been established successfully.');
                Application.init(this.client.sequelize);
                Application.sync();
                Guild.init(this.client.sequelize);
                Guild.sync({ alter: true });
                Alarm.init(this.client.sequelize);
                Alarm.sync({ alter: true });

            })
            .catch(err => this.client.logger.error('Unable to connect to the database:', err));
        const slashCommandsArray = [...new Set(this.client.slashCommands.map( cmd => cmd ))];
        // console.log(slashCommandsArray);
        this.client.logger.info(`${this.client.user.tag} has logged into the following servers:`);
        this.client.guilds.cache.map(async guild => {
            let prefix = await Guild.findOne({ where: { guildId: guild.id } }).then(async newGuild => {
                if (!newGuild) {
                    await Guild.create({ guildId: guild.id, guildPrefix: this.client.prefix });
                    return this.client.prefix;
                }   else {  
                    return newGuild.prefix;
                }   });
            this.client.logger.info(`    -  ${guild.name}  [${prefix}]`);
            await guild.commands.set(slashCommandsArray);
        })
        // this.client.application?.commands.set(slashCommandsArray);
        
        const startmessage= (`Bot has started in ${this.client.guilds.cache.size} servers with ${this.client.channels.cache.size} channels and ${this.client.users.cache.size} users.`)
        this.client.logger.success(startmessage);

        this.client.user.setActivity('YOU', { type: 'WATCHING'});
    }
}
