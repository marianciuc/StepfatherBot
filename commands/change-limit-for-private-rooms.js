const fs = require("fs");
let serverJson = require("../servers.json");
module.exports = {
    name: "change-limit-for-private-rooms",
    description: "private add <category id> <channel id>",
    async execute(args, message) {
        if (args.length < 2) return;
        let guildId = message.guild.id;
        if (!serverJson[guildId]) {
            message.channel.send("First you need to set up a private channel");
        } else {
            serverJson[guildId] = {
                categoriesId: serverJson[guildId].categoriesId,
                channelId: serverJson[guildId].channelId,
                limit: args[1]
            }
            fs.writeFile("servers.json", JSON.stringify(serverJson), (error) => { if (error) console.log(error.message)});
        }
    }
}
