const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/models/Guild');

module.exports = class LicenseCheckCommand extends BaseCommand {
    constructor() {
        super('licensecheck', 'license', ['lc'], [],
    10,
    false,
    true,
    '');
    }

    async run(client, message, args) {
        await client.sequelize.query(`SELECT * FROM Guild WHERE license = '${args[0]}'`)
            .then(async ([rows]) => {
                console.log(rows)
                if(!rows || rows.length <= 0) {
                    return message.reply("**Λάθος κωδικός.**")
                }
            })
            .catch(err => {
                console.log(err);
            });
        await client.sequelize.query(`SELECT * FROM Guild WHERE license = '${args[0]}'`)
            .then(async ([rows]) => {
                if (!rows || rows.length <= 0) {
                    return message.reply('**Λανθασμένος κωδικός**')
                } else {
                    let key = rows[0].key
                    // if key exists remove and update server table
                    await client.sequelize.query(`UPDATE Guild SET active = 'true' where guildID = '${message.guild.id}'`)
                    .then(([rows]) => {
                        active = true;
                    })
                    .catch(err => console.error(err));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}