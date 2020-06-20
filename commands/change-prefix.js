let Database = require("../modules/DataBase.js");

module.exports = {
    name: "change-prefix",
    description: "<prefix> manage prefix <new prefix>",
    execute(message, args, bot){

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        let guildId = message.guild.id;

        Database.updateGuild(bot, "prefix", args[1], guildId);

        message.channel.send(`Prefix has been changed to ***${args[1]}***`);
    }
}