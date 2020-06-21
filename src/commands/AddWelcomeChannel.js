const database = require("../DataAccessObjects/ServersImplementation.js");

module.exports = {
    name: "add-welcome",
    description: "<tag> welcome <channel id>",
    execute(message, channelId, bot){

        console.log(" sda "+channelId);

        console.log(" sda "+channelId);

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        if (!message.guild.channels.cache.get(channelId)){
            message.channel.send("Channel not founded");
            return 0;
        }

        database.updateGuild(bot, "welcome_channel_id", channelId, message.guild.id);

        message.channel.send(`***New welcome channel name***: ${message.guild.channels.cache.get(channelId)}`);
    }
}
