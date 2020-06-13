const Discord = require('discord.js');
module.exports = {
    name: "help-menu",
    descriptiom: "menu",
    execute(msg){
      let embed = new Discord.MessageEmbed()
          .setDescription(`To connect the bot to your server and use private chat function write:+`+ "```c\n!connect```")
          .setAuthor("Stepfather Help list",)
          .setColor(0xffd63e)
          .addFields(
              {name: '\u200B', value: "Show a list of commands ```!help```", inline: true},
              {name: '\u200B', value: "Flip a coin ```!flip```", inline: true},
              {name: '\u200B', value: "Private help list ```!connect```", inline: true},
              {name: '\u200B', value: "Delete last n messages ```!purge <n>```", inline: true},
              {name: '\u200B', value: "Get embedded message ```!embed <message content>```", inline: true},
              {name: '\u200B', value: "Get user image ```!avatar <@user>``` or ```!avarar <@user> <@user>```", inline: true},
              {name: '\u200B', value: "Generates a random number from 0 to the value you entered\n```js\n!random 20``````js\n@author, Value from 0 to 20 - 11```",inline: true},
          );
      msg.channel.send(embed);
}}