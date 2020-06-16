const Discord = require('discord.js');

module.exports = {
    name: "bot-info",
    description: "Display bot info",
    execute(message,bot){

        let countUsers = 0;
        let countCategory = 0;
        let countVoice = 0;
        let countText = 0;
        for (let guild of bot.guilds.cache) {
            guild.map(guild => {
                if (guild.memberCount) {
                    countUsers += guild.memberCount;
                }
            });
        }
        for (let channel of bot.channels.cache) {
            channel.map(channel => {
                if (channel.type) {
                   switch (channel.type) {
                       case "voice":
                           countVoice++;
                           break;
                       case "text":
                           countText++;
                           break;
                       case "category":
                           countCategory++;
                           break;
                   }
                }
            });
        }


        let embedElement = new Discord.MessageEmbed()
            .setColor(0xffd63e)
            .setAuthor(`🤖 ${bot.user.username}\`s information`)
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setDescription(`**Count guilds members:** ${countUsers}\n**Channels count:** ${bot.channels.cache.size}`+
                `\n**Guilds count:** ${bot.guilds.cache.size}\n**Uptime:** ${bot.uptime/1000} S\n`+
                `**Text channels:** ${countText}\n**Voice channels:** ${countVoice}\n**Categories:** ${countCategory}`+
                `\n\n**Host info:**\n **CPU:** 1\n**RAM:** 1 Gb\n**SSD:** 15 Gb\n**OS:** Ubuntu 18.04`+
                `\n\n**Bot developer:** ${bot.users.cache.get("295862909714825217").tag}`+
                `\nOfficial [Discord server](https://discord.gg/CsesfUv)`+
                `\n**[Donate link](https://discord.gg/CsesfUv)**`)
            .setTimestamp();
        message.channel.send(embedElement);
    }
}