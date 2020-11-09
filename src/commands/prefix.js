const Guild = require('../entity/guild')

module.exports = {
    name: "prefix",
    visibility: true,
    description: "📲 Change the prefix to call the bot.",
    execute(message, prefix, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Sorry, but you are not an administrator of this guild, so you can't change the prefix.");
            return 0;
        }
        Guild.findOneAndUpdate({guildId: message.guild.id}, {prefix: args[0] || '!'}, {upsert: true}, function (err, doc) {
            if (err) return debug.log(err, __filename);
            message.channel.send(`The prefix was successfully changed to ***${args[0]}***`);
        });
    }
}