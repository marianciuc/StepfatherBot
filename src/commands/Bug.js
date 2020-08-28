const Discord = require(`discord.js`);
const log = require(`../Debug`);

module.exports = {
    name: "bug",
    execute(message, prefix, bot){
        let url;
        let content = " "; //Text collection
        const guildId = "722474784709148734";
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);

        message.attachments.map(attachment => { //if image attachments isTrue we change undefined to image url
            url = attachment.url;
        });

        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }

        bot.channels.fetch(`${guildId}`).then( channel => {
            const embed = new Discord.MessageEmbed()
                .setColor(0xffd63e)
                .setAuthor(`${message.author.tag} from ${message.guild.name}`, `${message.author.avatarURL()}`)
                .setDescription(`${content}`,)
                .setImage(`${url ? url :"https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif"}`)//if url isTrue, we attaching image, else we input rainbow gif image
                .setTimestamp();
             channel.send(embed).catch(err => log.log(bot, err));
        });
        message.reply("Bug message sent successfully"); //reply to author
    }
}