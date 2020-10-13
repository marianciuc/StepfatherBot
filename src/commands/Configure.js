const database = require("../DataAccessObjects/ServersImplementation.js");
const log = require("../Debug.js");
let server = require("../Models/Server.js");

module.exports = {
    name: "configure",
    description: "Send your message using the Embeded function.",
    visibility: false,
    execute(message, bot){
        let Server = new server(message.guild.id, "ss", null, "!", null,
            null, null, 2);
        database.addToDataBase(bot, Server);
        log.log(bot, `${message.guild.name} (${message.guild.id})  configured guid.`);
    }
}