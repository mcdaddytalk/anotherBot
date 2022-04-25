const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('test2', 'test', [], [], 10, true, true, false, '<user>');
    }

    async run(client, message, args) {
        let iUser = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        // console.log(iUser);
        console.log(iUser.id);

        if (!iUser) return message.channel.send('Plz tag urself or the user your trying to see');

        const member = await message.guild.members.fetch(iUser.id);
        // console.log(member);

        const nitro = await message.guild.roles.cache.find(r => r.name.toLowerCase() === 'server booster');
        const animeVIP = await message.guild.roles.cache.find(r => r.name.toLowerCase() === 'anime vip');
        const partner = await message.guild.roles.cache.find(r => r.name.toLowerCase() === 'partner');
        const general = await message.guild.roles.cache.find(r => r.name.toLowerCase() === 'general');

        const hasNitro = member.roles.cache.has(nitro?.id) ? true : false;
        const hasAnimeVIP = member.roles.cache.has(animeVIP?.id) ? true : false;
        const hasPartner = member.roles.cache.has(partner?.id) ? true : false;
        const hasGeneral = member.roles.cache.has(general?.id) ? true : false;

        // do something with the above
        console.log(hasNitro);
        console.log(hasGeneral);
        console.log(hasAnimeVIP);
        console.log(hasPartner);
    }
};
