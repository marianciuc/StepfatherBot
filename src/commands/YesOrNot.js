const Discord = require('discord.js');

module.exports = {
    name: "yn",
    description: "Get an answer to the question",
    visibility: true,
    execute(message, prefix){
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/); //Getting args from string
        const s = Math.random() * 100>50 ? `No` : `Yes`;

        let content = " ";
        for (let i = 1; i<args.length; i++){
            content = content +" "+ args[i];
        }

        const embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor(message.author.username)
            .setThumbnail("https://i.pinimg.com/originals/92/a4/ac/92a4acc3099fdccb91e6c3447c2ed12f.gif")
            .setDescription(`${content}\n- ${s}`)
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();
        message.reply(embed);
    }
}