const database = require("../modules/DataBase.js");

module.exports = {
    name: "add-welcome",
    description: "<tag> welcome <channel id>",
    async execute(message, args, bot){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        if (args.length < 2) return;
        if (!message.guild.channels.cache.get(args[1])){
            message.channel.send("Channel not founded");
            return 0;
        }

        database.updateGuild(bot, "welcome_channel_id", args[1], message.guild.id);

        message.channel.send(`***New welcome channel name***: ${message.guild.channels.cache.get(args[1])}`);
    }
}
