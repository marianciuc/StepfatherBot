const Discord = require('discord.js');
module.exports = {
    name: "get-user-image",
    descriptiom: "menu",
    execute(message){
        if (!message.mentions.users.size){
            return;
        }
        const avatarList = message.mentions.users.map(user => {
            return new Discord.MessageEmbed()
                .setAuthor(`Avatar for ${user.tag}`)
                .setColor(0xffd63e)
                .setImage(`${user.avatarURL()}`)
        });
        for (users in avatarList){
            message.channel.send(avatarList[users]);
        }
    }}