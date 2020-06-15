let config = require("../servers.json");
const fs = require("fs");

module.exports = {
    name: "change-prefix",
    description: "<prefix> manage prefix <new prefix>",
    execute(message, args){

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        let guildId = message.guild.id;
        config[guildId] = {
            categoriesId: config[guildId].categoriesId,
            channelId: config[guildId].channelId,
            limit: config[guildId].limit,
            prefix: args[1]
        }
        fs.writeFile("servers.json", JSON.stringify(config), (error) => {
            if (error) console.log(error.message)
        });
        message.channel.send(`Prefix has been changed to ***${args[1]}***`);
    }
}