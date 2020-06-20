const database = require("../modules/DataBase.js");
const log = require("../modules/Log.js");
let server = require("../modules/Server.js");

module.exports = {
    name: "configure",
    execute(message, bot){
        let Server = new server(message.guild.id, null, null, "!", null,
            null, null, 2);
        database.addToDataBase(bot, Server);
        log.log(bot, `${message.guild.name} (${message.guild.id})  configured guid.`);
    }
}