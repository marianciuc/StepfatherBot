const Discord = require('discord.js');

module.exports = {
    name: "yon",
    description: "Generating random value",
    execute(message, prefix){
        let s;
        Math.random() * 100>50 ? s = `No` : s = `Yes`;
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
        let content = " ";
        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }
        let embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor(message.author.username)
            .setThumbnail("https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif")
            .setDescription(`${content}\n- ${s}`)
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();
        message.reply(embed);
    }
}