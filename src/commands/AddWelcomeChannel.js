const database = require("../DataAccessObjects/ServersImplementation.js");

module.exports = {
    name: "add-welcome",
    description: "<tag> welcome <channel id>",
    async execute(message, args, bot){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        if (!message.guild.channels.cache.get(args)){
            message.channel.send("Channel not founded");
            return 0;
        }

        database.updateGuild(bot, "welcome_channel_id", args, message.guild.id);

        message.channel.send(`***New welcome channel name***: ${message.guild.channels.cache.get(args)}`);
    }
}
