const Discord = require('discord.js');

module.exports = {
    name: "help-menu",
    description: "menu",
    execute(msg, prefix){
      let embed = new Discord.MessageEmbed()
          .setDescription(`To connect the bot to your server and use private chat function write:`+ "```c\n"+prefix+"connect```")
          .setAuthor("🤖 Stepfather Help list",)
          .setColor(0xffd63e)
          .addFields(
              {name: '\u200B', value: "\n" +
                      "Get a list of guild administration help (configure the welcome channel, change the bot prefix for the server, and much more)" +
                      "\n```js\n"+prefix+"manage help```",inline: false},
              {name: '\u200B', value: "Send bug report ```"+prefix+"bug <report text>```", inline: true},
              {name: '\u200B', value: "Send suggestions message ```"+prefix+"sug <suggestions message>```", inline: true},
              {name: '\u200B', value: "Show a list of commands ```"+prefix+"help```", inline: true},
              {name: '\u200B', value: "Yes or Not ```"+prefix+"yn <question>```", inline: true},
              {name: '\u200B', value: "Get bot info ```"+prefix+"status```", inline: true},
              {name: '\u200B', value: "🐬 Flip a coin ```"+prefix+"flip```", inline: true},
              {name: '\u200B', value: "Private help list ```"+prefix+"connect```", inline: true},
              {name: '\u200B', value: "Delete last n messages ```"+prefix+"purge <n>```", inline: true},
              {name: '\u200B', value: "Get embedded message ```"+prefix+"embed <message content>```", inline: true},
              {name: '\u200B', value: "Get user image ```"+prefix+"avatar <@user>``` or ```"+prefix+"avarar <@user> <@user>```", inline: true},
              {name: '\u200B', value: "Generates a random number from 0 to the value you entered\n```js\n"+prefix+"random 20``````js\n@author, Value from 0 to 20 - 11```",inline: true},
          );
      msg.channel.send(embed);
}}
