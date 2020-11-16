const { news }  = require('../entity/index')
const Discord   = require('discord.js');

module.exports = {
    name: "news",
    description: "🆕 Call up a menu with the latest news about the bot update.",
    visibility: true,
    execute(message){
        news.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
            bot.users.fetch('295862909714825217').then((user) => {
                const embed = new Discord.MessageEmbed()
                    .setColor("0xffd63e")
                    .setAuthor('🔥 ' + bot.user.username + ' news  from the '+ new Date(post.updatedAt).toDateString())
                    .setTitle(post.title + ` (includes ${post.changes.length} upgrades)`)
                    .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
                    .setFooter("Bot developer: " + user.tag + "\nTo support the developer and help improve the bot you can follow the link and donate.", user.avatarURL({format: "png"}))
                for (const item of post.changes) {
                    embed.addFields({name: item.title, value: item.description})
                }
                message.channel.send(embed);
            });
        });
    }
}
