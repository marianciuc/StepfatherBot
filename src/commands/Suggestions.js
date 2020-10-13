const Discord = require(`discord.js`);
const log = require(`../Debug`);

module.exports = {
    name: "sug",
    description: "Send your idea to us in a discord and telegram.",
    visibility: true,
    execute(message, prefix, bot) {
        let url;
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
        const guildId = "730228289469284363";
        let content = " ";

        message.attachments.map(attachment => {
            url = attachment.url;
        });

        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }

        bot.channels.fetch(`${guildId}`).then(channel => {
            const embed = new Discord.MessageEmbed()
                .setColor(0xffd63e)
                .setAuthor(`${message.author.tag} from ${message.guild.name}`, `${message.author.avatarURL()}`)
                .setDescription(`${content}`,)
                .setImage(`${url ? url :"https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif"}`)
                .setTimestamp();
            channel.send(embed).catch(err => log.log(bot, err));
        });
        message.reply("Suggestions message sent successfully");
    }
}