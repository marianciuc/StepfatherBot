const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "menu list",
    execute(message){
        if (!message.mentions.users.size){
            message.channel.send(message.author.avatarURL());
            return;
        }
        const avatarList = message.mentions.users.map(user => {
            return new Discord.MessageEmbed()
                .setAuthor(`Avatar for ${user.tag}`)
                .setColor(0xffd63e)
                .setImage(`${user.avatarURL()}`)
        });
        for (const user in avatarList){
            message.channel.send(avatarList[user]);
        }
    }}