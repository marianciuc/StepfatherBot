const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: "manage-help",
    description: "Get manage help list",
    execute(message){

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        let embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor("Manege help list")
            .setDescription(`[Connect](https://discordapp.com/api/oauth2/authorize?client_id=700113613825769522&permissions=8&scope=bot) bot to your server.`)
            .addFields(
                { name: '\u200B', value: 'Set or change welcome channel' +
                        '```js\n'+config.prefix+'manage welcome <id channel>```' },
                { name: '\u200B', value: 'Change user limit```js\nprivate limit <new user limit>```' },
            )
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();
        message.channel.send(embed);

    }
}