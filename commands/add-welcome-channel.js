const fs = require("fs");
let serverJson = require("../servers.json");
module.exports = {
    name: "add-welcome",
    description: "<tag> welcome <channel id>",
    async execute(message, args){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        if (args.length < 2) return;
        if (!message.guild.channels.cache.get(args[1])){
            message.channel.send("Channel not founded");
            return 0;
        }

        let guildId = message.guild.id;

        serverJson[guildId] = {
            categoriesId: serverJson[guildId].categoriesId,
            channelId: serverJson[guildId].channelId,
            limit: serverJson[guildId].limit,
            prefix: serverJson[guildId].prefix,
            welcome_channel: args[1]
        }
        fs.writeFile("servers.json", JSON.stringify(serverJson), (error) => {
            if (error) console.log(error.message)
        });
        message.channel.send(`***New welcome channel name***: ${message.guild.channels.cache.get(args[1])}`);
    }
}
