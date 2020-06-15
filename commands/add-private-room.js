const fs = require("fs");
let serverJson = require("../servers.json");
module.exports = {
    name: "add-private-room",
    description: "private add <category id> <channel id>",
    async execute(args, message) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }
        if (args.length < 3) return;
        if (!message.guild.channels.cache.get(args[2]) && message.guild.channels.cache.get(args[1]) != args[1]){
            message.channel.send("Channel or category not founded");
            return 0;
        }
        let guildId = message.guild.id;
            serverJson[guildId] = {
                categoriesId: args[1],
                channelId: args[2],
                limit: 2,
                prefix: serverJson[guildId].prefix,
                welcome_channel: serverJson[guildId].welcome_channel
            }
            fs.writeFile("servers.json", JSON.stringify(serverJson), (error) => {
                if (error) console.log(error.message)
            });
        message.channel.send(`***New private channel name***: ${message.guild.channels.cache.get(args[2]).name}\n`+
            `***Category name:*** ${message.guild.channels.cache.get(args[1])}`);
    }
}
