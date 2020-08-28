const Discord = require('discord.js');

module.exports = {
    name: "rand",
    execute(message){
        const maxValue = parseInt(message.content.replace(/\D+/g, ""));

        if (maxValue <= 999999999) {
            const embedElement = new Discord.MessageEmbed()
                .setColor(0xffd63e)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                .setDescription(`Value from 0 to ${maxValue} - ${Math.floor(Math.random() * maxValue)}`)
                .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
                .setTimestamp();
            message.channel.send(embedElement);
        }
    else message.channel.send("Error 🚑. Enter another value.");
    }
}