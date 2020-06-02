const fs = require("fs");
let serverJson = require("../servers.json");
module.exports = {
  name: "add-private-room",
  description: "private add <category id> <channel id>",
  async execute(args, message) {
    if (args.length < 3 || !message.author.hasPermission("ADMINISTRATOR")) return;
    let guildId = message.guild.id;
    if (!serverJson[guildId]) {
      serverJson[guildId] = {
        categoriesId: args[1],
        channelId: args[2],
        limit: 2
      }
      fs.writeFile("servers.json", JSON.stringify(serverJson), (error) => { if (error) console.log(error.message)});
    } else {
      serverJson[guildId] = {
        categoriesId: args[1],
        channelId: args[2]
      }
      fs.writeFile("servers.json", JSON.stringify(serverJson), (error) => { if (error) console.log(error.message)});
    }
  }
}
