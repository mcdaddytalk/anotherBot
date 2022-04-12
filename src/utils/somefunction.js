const { MessageEmbed } = require('discord.js');

module.exports = class Embeds extends MyEmbeds {
    constructor() {
        super('stats', 'Replies with stats', []);
    }

    async getAll(players, requestor, id, order, client) {
        let embeds = [];
        let i = 0;
        let playerStats = [];
        players.forEach(player => {
            let playerKills = player.PlayerKills;
            let playerDeaths = player.PlayerDeath;
            let tameKills = player.TameKills;
            let wildDinoKills = player.WildKills;
            let dinoKills = player.DinoKill;
            let playTime = player.PlayTime;
            let userName = player.username;
            let points = player.Points;
            let wins = player.Wins;
            let steamId = player.steamid;

            let kd = parseFloat(playerKills / playerDeaths);
        
            if(kd === Infinity) {
                kd = playerKills;
            }

            //if(userName === null)return;

            i++;
            const stats = {
                name: userName,
                kd: kd,
                wins: wins,
                points: points
            }
            playerStats.push(stats)
        });

        let embedLength = Math.round(playerStats.size / 10);

        if(embedLength < playerStats.size / 10) embedLength = embedLength + 1;

        for(let i = 1; i < embedLength; i++) {
            embeds.push(new MessageEmbed().setTitle('Leader Board').setFooter('requested by ' + requestor.tag).setTimestamp());
        }

        i = 0

        embeds.forEach(embed => {
            let statsOnEmbed = 0;
            let maxStatsOnEmbed = 10;
            let stats = [];

            for(statsOnEmbed; statsOnEmbed < maxStatsOnEmbed; statsOnEmbed++) {
                i++;
            
                if(playerInfo.get(i) === undefined) return;
            
                stats.push(playerStats[i]);
            }

            embed.setDescription(stats.map((item) => `\`${i}  ${item.name.padEnd(20)} ${item.wins.toString().padStart(3, ' ')} Wins 
                ${item.kd.toString().padStart(3, ' ')} K/D ${item.points.toString().padStart(5,' ')} Points\``).join('\n'));
        
        });


        //console.log(embeds.length)

        embeds.forEach(embed => {
            i++;
        });

        client.statEmbeds.set(id, embeds);
        return embeds[0];
    }
}