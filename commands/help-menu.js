const Discord = require('discord.js');
module.exports = {
    name: "help-menu",
    descriptiom: "menu",
    execute(msg){
      let embed = new Discord.MessageEmbed()
          .setDescription("To connect the bot to your server and use private chat function, follow the [link](google.com) and write: ```c\n!connect```")
          .setAuthor("ClosenessBot Help list",)
          .setColor(0xffd63e)
          .addFields(
              {name: '\u200B', value: "Show a list of commands ```!help```", inline: true},
              {name: '\u200B', value: "Generates a random number from 0 to the value you entered\n```js\n!random 20``````js\n@author, Value from 0 to 20 - 11```",inline: true},
          );
      msg.channel.send(embed);
}}