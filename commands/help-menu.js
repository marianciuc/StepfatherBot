const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "help-menu",
    description: "menu",
    execute(msg){
      let embed = new Discord.MessageEmbed()
          .setDescription(`To connect the bot to your server and use private chat function write:+`+ "```c\n"+config.prefix+"connect```")
          .setAuthor("Stepfather Help list",)
          .setColor(0xffd63e)
          .addFields(
              {name: '\u200B', value: "Show a list of commands ```"+config.prefix+"help```", inline: true},
              {name: '\u200B', value: "Flip a coin ```"+config.prefix+"flip```", inline: true},
              {name: '\u200B', value: "Private help list ```"+config.prefix+"connect```", inline: true},
              {name: '\u200B', value: "Delete last n messages ```"+config.prefix+"purge <n>```", inline: true},
              {name: '\u200B', value: "Get embedded message ```"+config.prefix+"embed <message content>```", inline: true},
              {name: '\u200B', value: "Get user image ```"+config.prefix+"avatar <@user>``` or ```"+config.prefix+"avarar <@user> <@user>```", inline: true},
              {name: '\u200B', value: "Generates a random number from 0 to the value you entered\n```js\n"+config.prefix+"random 20``````js\n@author, Value from 0 to 20 - 11```",inline: true},
          );
      msg.channel.send(embed);
}}