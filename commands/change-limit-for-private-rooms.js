const database = require("../modules/DataBase.js");

module.exports = {
    name: "change-limit-for-private-rooms",
    description: "private add <category id> <channel id>",
    async execute(args, message, bot) {
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
