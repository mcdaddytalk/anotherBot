const BaseEvent = require('../../utils/structures/BaseEvent');
//const StateManager = require('../../utils/StateManager');
const sequelize = require('sequelize');
const { Guilds, Miners, Users, Alarms } = require('../../../database/models');

//const guildCommandPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor(...args) {
        super(...args, 'ready', { once: true });
    }

    async run() {
        const { debug } = this.client;
        // Initialize Miners
        const storedMiners = await Miners.findAll({ include: ['users', 'guilds'] });
        if (storedMiners.length > 0) {
            storedMiners.forEach(miner => {
                const { userId, guildId } = miner.users;
                this.client.miners.init(`${guildId}-${userId}`, miner);
            });
        }
        this.client.intervalManager.set(
            `Daily-Miner`,
            async () => {
                // const miners = await Miners.findAll({ include: ['users', 'guilds'] });
                const { miners } = this.client;
                const currentTime = Date.now();
                miners.forEach(async miner => {
                    const nextDaily = new Date(miner.nextDaily).getTime();
                    this.client.logger.debug(`${miner.users.userName} is mining in ${miner.guilds.guildName}...`);
                    this.client.logger.debug(`${miner.users.userName} has ${miner.mined} mined so far.`);
                    this.client.logger.debug(`CurrentTime -> ${currentTime} :: NextDaily ->  ${nextDaily}`);
                    if (currentTime >= nextDaily) {
                        const member = {
                            userId: miner.users.userId,
                            guildId: miner.users.guildId,
                            userName: miner.users.userName,
                        };
                        this.client.currency.add(member, miner.mined);
                        miner.mined = 0;
                        miner.nextDaily = sequelize.literal('NOW() + INTERVAL 24 hour');
                        await miner.save();
                    } else {
                        if (miner.mined < miner.dailyAmount - 1) {
                            miner.mined += 1;
                            await miner.save();
                        }
                    }
                });
            },
            1000 * 60 * 1
        );
        // Initialize User balances
        const storedBalance = await Users.findAll();
        if (storedBalance.length > 0) {
            storedBalance.forEach(user => this.client.currency.init(`${user.guildId}-${user.userId}`, user));
        }
        // Initialize Alarms
        const storedAlarms = await Alarms.findAll();
        if (storedAlarms.length > 0) {
            storedAlarms.forEach(alarm => this.client.alarms.init(`${alarm.alarmId}-${alarm.id}`, alarm));
        }
        this.client.intervalManager.set(
            `Alarm-Check`,
            async () => {
                const { alarms } = this.client;
                alarms.forEach(async alarm => {
                    const { id, alarmId: userId, name: userName, alarmName: name, alarmTime, enabled } = alarm;
                    if (!enabled) return;
                    const { days, hour, minute } = JSON.parse(alarmTime);
                    const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const currentTime = new Date();
                    const currentDay = currentTime.getDay();
                    const currentHour = currentTime.getHours();
                    const currentMinute = String(currentTime.getMinutes()).padStart(2, '0');
                    this.client.logger.debug(`Alarm ${name} is checking...`);
                    this.client.logger.debug(
                        `CurrentDay -> ${daysList[currentDay]} :: CurrentHour -> ${currentHour} :: CurrentMinute -> ${currentMinute}`
                    );
                    this.client.logger.debug(`Days -> ${days} :: Hour -> ${hour} :: Minute -> ${minute}`);
                    if (days.includes(daysList[currentDay]) && currentHour == hour && currentMinute == minute) {
                        this.client.logger.success(`${name} is ringing for ${userName}!`);
                        this.client.alarms.ring(`${userId}-${id}`);
                    }
                });
            },
            1000 * 30
        );

        // Initialize Slash Commands
        const slashCommandsArray = [...new Set(this.client.slashCommands.map(cmd => cmd))];
        // console.log(slashCommandsArray);
        const startmessage = `Bot has started in ${this.client.guilds.cache.size} servers with ${this.client.channels.cache.size} channels and ${this.client.users.cache.size} users.`;
        this.client.logger.success(startmessage);
        this.client.logger.info(`${this.client.user.tag} has logged into the following servers:`);
        this.client.guilds.cache.map(async guild => {
            let prefix = await Guilds.findOne({ where: { guildId: guild.id } }).then(async newGuilds => {
                if (!newGuilds) {
                    if (debug) this.client.logger.warn(`${guild.name} has no configuration set.  Creating...`);
                    await Guilds.create({ guildId: guild.id, guildName: guild.name, guildPrefix: this.client.prefix });
                    if (debug)
                        this.client.logger.warn(
                            `${guild.name} configuration created. Using default prefix: ${this.client.prefix}`
                        );
                    return this.client.prefix;
                } else {
                    if (debug)
                        this.client.logger.info(
                            `${guild.name} has a configuration set.  Using prefix: ${newGuilds.guildPrefix}`
                        );
                    return newGuilds.guildPrefix;
                }
            });
            this.client.logger.info(`    -  ${guild.name}  [${prefix}]`);
            await guild.commands.set(slashCommandsArray);
            // const commands = await guild.commands.fetch();
            // const cmd = commands.find(cmd => cmd.name === 'help');
            // const cmd = commands.filter(cmd => cmd.name === 'help');
            // console.log(cmd);
        });
        // this.client.application?.commands.set(slashCommandsArray);

        this.client.user.setActivity('YOU', { type: 'WATCHING' });
    }
};
