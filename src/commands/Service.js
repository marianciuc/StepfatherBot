const Discord = require(`discord.js`);
const log = require(`../Debug`);

module.exports = {
    name: "service",
    execute(message, prefix, bot, type){

        //checking for image attachments
        let url;
        message.attachments.map(attachment => { //if image attachments isTrue we change undefined to image url
            url = attachment.url;
        });

        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/); //regex

        let content = " "; //Text collection
        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }

        let guildId;

        if (type === 'bug') guildId = "722474784709148734"; //If message type is bug, we send message to channel with "722474784709148734" id
        else guildId = "722474763456348240"; //If message type is sug, we send message to channel with "722474784709148734" id

        //sending message to selected channel
        bot.channels.fetch(`${guildId}`).then(channel => {
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