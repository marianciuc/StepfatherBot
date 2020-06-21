const Discord = require('discord.js');
const os = require('os')


module.exports = {
    name: "bot-info",
    description: "Display bot info",
    getOsInfo(message, bot) {

        let countUsers = 0;
        let countCategory = 0;
        let countVoice = 0;
        let countText = 0;

        for (const guild of bot.guilds.cache) {
            guild.map(guild => {
                if (guild.memberCount) {
                    countUsers += guild.memberCount;
                }
            });
        }
        for (const channel of bot.channels.cache) {
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

        const ram = os.totalmem() / 1024 / 1024 / 1024;
        const freeRam = os.freemem() / 1024 / 1024 / 1024;
        const uptimeBot = bot.uptime / 1000 / 60 / 24;
        const uptimeOs = os.uptime() / 1000 / 60 / 24;


        const embedElement = new Discord.MessageEmbed()
            .setColor(0xffd63e)
            .setAuthor(`🤖 ${bot.user.username}\`s information`)
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setDescription(`**Count guilds members:** ${countUsers}\n**Channels count:** ${bot.channels.cache.size}` +
                `\n**Guilds count:** ${bot.guilds.cache.size}\n**Bot uptime:** ${uptimeBot.toFixed(2)} Days\n` +
                `**Text channels:** ${countText}\n**Voice channels:** ${countVoice}\n**Categories:** ${countCategory}` +
                `\n\n**Host info:**\n **OS uptime:** ${uptimeOs.toFixed(2)} Days\n**CP:** ${os.cpus()[0].model}\n**RAM:** ${freeRam.toFixed(2)}/${ram.toFixed(2)}Gb\n**OS:** ${os.version()} (${os.release()})` +
                `\n\n**Bot developer:** ${bot.users.cache.get("295862909714825217").tag}` +
                `\nOfficial [Discord server](https://discord.gg/CsesfUv)` +
                `\n**[Donate link](https://www.donationalerts.com/r/stepfather)**`)
            .setTimestamp();
        message.channel.send(embedElement);
    },
    getServersList(message, bot) {
        let count = " ";
        for (const guild of bot.guilds.cache) {
            guild.map(guild => {
                if (guild.name) {
                    count = count + "\n" + guild.name + "(" + guild.id + "): " + guild.memberCount + " members";
                }
            });
        }
        message.channel.send(count);
    }
}