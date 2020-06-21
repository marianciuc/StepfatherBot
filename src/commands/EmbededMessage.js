const Discord = require(`discord.js`);

module.exports = {
    name: "embeddedMessage",
    description: "Embedded your message( embed <message content>)",
    execute(message, prefix){
        let url = undefined;
        message.attachments.map(attachment => {
            url = attachment.url;
        });
        const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
        let content = " ";
        for (let i = 1; i<args.length;i++){
            content = content +" "+ args[i];
        }
        let embedElement = new Discord.MessageEmbed()
            .setColor(0xffd63e)
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
        .setDescription(`${content}`,)
            .setImage(`${url != undefined ? url :"https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif"}`)
            .setTimestamp();
        message.channel.send(embedElement);
    }
}