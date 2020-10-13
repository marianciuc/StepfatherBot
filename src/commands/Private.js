const database = require("../DataAccessObjects/ServersImplementation.js");

module.exports = {
    name: "private",
    description: "private add <category id> <channel id>",
    visibility: false,
    async addPrivateRoom(args, message, bot) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        if (args.length < 3) return;
        if (!message.guild.channels.cache.get(args[2]) && message.guild.channels.cache.get(args[1]) != args[1]){
            message.channel.send("Channel or category not founded");
            return 0;
        }

        database.updateGuild(bot, "private_category_id", args[1], message.guild.id);
        database.updateGuild(bot, "private_channel_id", args[2], message.guild.id);

        message.channel.send(`**Private room successful added**\n***New private channel name***: ${message.guild.channels.cache.get(args[2]).name}\n`+
            `***Category name:*** ${message.guild.channels.cache.get(args[1])}`);
    },
    changeLimit(args, message, bot){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        if (args.length < 2) return;
        if (args[1]>98 || args[1]<0){
            message.reply("Please change limit. Maximal limit is 98 and minimal is 0.");
            return 0;
        }
        let guildId = message.guild.id;
        database.updateGuild(bot, "private_channel_limit", args[1], guildId);

        message.channel.send(`Private channel limit has been changed to ${args[1]}`);
    }
}
