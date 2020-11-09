const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "ℹ️ Call the bot help menu.",
    visibility: true,
    execute(message, prefix) {
        bot.users.fetch('295862909714825217').then((user) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Our site (in development).')
            .setAuthor("🤖 Stepfather Help list",)
            .setColor(0xffd63e)
            .setFooter("Bot developer: " + user.tag + "\nTo support the developer and help improve the bot you can follow the link and donate.", user.avatarURL({format: "png"}));
            bot.commands.map(command => {
                if (command.visibility === true){
                    embed.addFields({name: command.description, value: "```"+prefix+command.name+"```", inline: true});
                }
            });
            message.channel.send(embed);
        });
    }
}
