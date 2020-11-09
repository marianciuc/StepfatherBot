const Discord = require(`discord.js`);
const debug = require(`../telegram`);

module.exports = {
    name: "bug",
    description: "🐛 Send your report about the bug to us in a discord and telegram.",
    visibility: true,
    execute(message, prefix){
        let url;
        let content = " ";
        const guildId = "722474784709148734";
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);

        message.attachments.map(attachment => {
            url = attachment.url;
        });
        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }
        debug.log(`${message.author.tag} from ${message.guild.name}\n${content}`);
        bot.channels.fetch(`${guildId}`).then( channel => {
            const embed = new Discord.MessageEmbed()
                .setColor(0xffd63e)
                .setAuthor(`${message.author.tag} from ${message.guild.name}`, `${message.author.avatarURL()}`)
                .setDescription(`${content}`,)
                .setImage(`${url || "https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif"}`)
                .setTimestamp();
             channel.send(embed).catch(err => debug.log(JSON.stringify(err), __dirname));
        });
        message.reply("the error message was sent successfully.");
    }
}