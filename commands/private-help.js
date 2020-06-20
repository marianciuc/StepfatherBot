const Discord = require("discord.js");
module.exports = {
    name: "private-help",
    description: "private help menu",
    execute(message, prefix){
        let embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor("Сloseness function.")
            .setDescription(`[Connect](https://discordapp.com/api/oauth2/authorize?client_id=700113613825769522&permissions=8&scope=bot) bot to your server.`)
            .addFields(
                {
                    name: '\u200B',
                    value: 'Add or replace current private channel' +
                        '```js\n'+prefix+'private add <id category> <id channel>```'
                }, {
                    name: '\u200B',
                    value: 'Change user limit```js\n'+prefix+'private limit <new user limit>```' },
            )
            .setImage("https://s7.gifyu.com/images/Record_2020_06_02_13_24_25_654.gif")
            .setTimestamp();
        message.channel.send(embed);
    }
}