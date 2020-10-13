const Discord = require('discord.js');

module.exports = {
    name: "flip",
    description: "Flip a coin to get an eagle or a tailpiece.",
    visibility: true,
    execute(message){
        const s = Math.random() * 100>50 ?  `Heads    🟡` :  `Tails    🟡`;
        const embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor(message.author.username+" threw a coin.")
            .setThumbnail("https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif")
            .setDescription(s)
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();

        message.channel.send(embed);
    }
}