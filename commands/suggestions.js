const Discord = require(`discord.js`);

module.exports = {
        name: "suggestions",
    execute(message, prefix, bot){
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
        let content = " ";
        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }
        if (message.length > 500){
            message.reply("❌ Message must be less than 500 characters");
            return 0;
        }
        bot.channels.fetch("722474763456348240").then(channel => {
            let embed = new Discord.MessageEmbed()
                .setColor(0xffd63e)
                .setAuthor(`${message.author.tag} from ${message.guild.name}`, `${message.author.avatarURL()}`)
                .setDescription(`${content}`,)
                .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
                .setTimestamp();
            channel.send(embed).catch(err => console.error(err));
        });
        message.reply("Suggestions message sent successfully");
    }
}