const BaseEvent = require('../../utils/structures/BaseEvent');
//const StateManager = require('../../utils/StateManager');
const Application = require('../../database/models/Application')

//const guildCommandPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        //this.connection = StateManager.connection;
    }

    async run(client) {
        await client.sequelize.authenticate()
            .then( () => {
                console.log('Connection has been established successfully.');
                Application.init(client.sequelize);
                Application.sync();
            })
            .catch(err => console.error('Unable to connect to the database:', err));

        console.log(`${client.user.tag} has logged into the following servers:`);

        const startmessage= (`Bot has started in ${client.guilds.cache.size} servers with ${client.channels.cache.size} channels and ${client.users.cache.size} users.`)
        console.log(startmessage);
        client.user.setActivity('YOU', { type: 'WATCHING'}).catch(console.error);
    }
}
