const Discord = require('discord.js');
const database = require('../DataAccessObjects/ServersImplementation.js');

module.exports = {
    name: "manage-help",
    description: "Get manage help list",
    async execute(message, bot){

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        let Server = await database.QueryInit(bot, message.guild.id);
        if (Server == null) return;

        let embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor("Manege help list")
            .setDescription(`[Connect](https://discordapp.com/api/oauth2/authorize?client_id=700113613825769522&permissions=8&scope=bot) bot to your server.`)
            .addFields(
                { name: '\u200B', value: 'Set or change welcome channel' +
                        '```js\n'+Server.prefix+'manage welcome <id channel>```' },
                { name: '\u200B', value: 'Change user limit```js\n'+Server.prefix+'private limit <new user limit>```' },
            )
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();
        message.channel.send(embed);

    }
}