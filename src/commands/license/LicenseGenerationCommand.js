const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { Guilds } = require('../../../database/models');

module.exports = class LicenseCheckCommand extends BaseCommand {
    constructor() {
        super('licensegen', 'license', ['lg', 'licgen'], [], 10, false, true, '');
    }

    async run(client, message, args) {
        if (!args[0]) return message.reply('Please provide guild id or `self` for license gen');
        let guildId = args[0];
        if (!args[1]) return message.reply('Please provide key given by admin');
        if (args[0].toLowerCase() === 'self') guildId = message.guild.id;
        const key = args[1];
        const isLicensed = await client.sequelize
            .query(`SELECT * FROM Guilds WHERE active = 1 and guildId = '${guildId}'`)
            .then(async ([rows]) => {
                console.log(rows);
                if (rows && rows.length > 0) {
                    await message.reply('**Guilds already licensed**');
                    return true;
                }
                await message.reply('**Guilds not licensed.  Generating license**');
                return false;
            })
            .catch(err => {
                console.log(err);
            });
        if (!isLicensed) {
            // generate license with key
        }
    }
};
