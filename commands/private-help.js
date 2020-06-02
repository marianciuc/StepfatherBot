const Discord = require("discord.js");
module.exports = {
    name: "private-help",
    description: "private help menu",
    execute(message){
        let embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor("Сloseness function.")
            .addFields(
                { name: '\u200B', value: 'Add or replace current private channel' +
                        '```js\nprivate add <id category> <id channel>```' },
                { name: '\u200B', value: 'Change user limit```js\nprivate limit <new user limit>```' },
            )
            .setImage("https://s7.gifyu.com/images/Record_2020_06_02_13_24_25_654.gif")
            .setTimestamp();
        message.channel.send(embed);
    }
}