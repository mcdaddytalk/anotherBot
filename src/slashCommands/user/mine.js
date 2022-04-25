const BaseSlashCommand = require('../../utils/structures/BaseSlashCommand');
const { Miners, Users, Guilds } = require('../../../database/models');

module.exports = class ShopSlashCommand extends BaseSlashCommand {
    constructor() {
        super({
            name: 'mine',
            description: 'Starts miner',
            options: [],
        });
    }

    async run(client, interaction) {
        // const { guild, user } = interaction;
        const guild = await Guilds.findOne({ where: { guildId: interaction.channel.guild.id } });
        const user = await Users.findOne({
            where: { guildId: interaction.channel.guild.id, userId: interaction.user.id },
        });
        const miner = await Miners.findOne({
            where: {
                '$users.id$': user.id,
                '$guilds.id$': guild.id,
            },
            include: ['users', 'guilds'],
        });
        if (miner) return interaction.reply({ content: `${user.userName} is already mining.`, ephemeral: true });
        await Miners.create({
            guildId: guild.id,
            userId: user.id,
            nextDaily: Date.now() + 1000 * 60 * 60 * 24,
            dailyAmount: 240,
            mined: 0,
        });
        return interaction.reply({
            content: `${user.userName} is now mining.`,
            ephemeral: true,
        });
    }
};
