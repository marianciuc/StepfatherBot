const Discord = require('discord.js');

module.exports = {
    name: "random",
    description: "Generating random value",
    execute(maxValue, message){
        maxValue = parseInt(maxValue.replace(/\D+/g, ""));
        if (maxValue < 32767 && maxValue > 0) {
            let embedElement = new Discord.MessageEmbed()
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