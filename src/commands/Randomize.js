const Discord = require('discord.js');

module.exports = {
    name: "random",
    description: "Functions: generate random value, get yes or not;",
    getRandomValue(maxValue, message){

        //getting all numbers from string
        maxValue = parseInt(maxValue.replace(/\D+/g, ""));

        //checking for maximal and minimal values
        if (maxValue < 999999999 && maxValue > 0) {
            const embedElement = new Discord.MessageEmbed()
                .setColor(0xffd63e)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
                .setDescription(`Value from 0 to ${maxValue} - ${Math.floor(Math.random() * maxValue)}`)
                .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
                .setTimestamp();
            message.channel.send(embedElement);
        }
    else message.channel.send("Error 🚑. Enter another value.");
    },
    getYesOrNot(message, prefix){

        let s; //create undefended value

        Math.random() * 100>50 ? s = `No` : s = `Yes`; //Yes or not

        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/); //Getting args from string

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
    },
    flip(message){
            let s;
            Math.random() * 100>50 ? s = `Heads    🟡` : s = `Tails    🟡`;

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