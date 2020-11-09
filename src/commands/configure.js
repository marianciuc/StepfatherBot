const debug         = require("../telegram");
const guild         = require('../controllers/guild')

module.exports = {
    name: "configure",
    description: "Send your message using the Embeded function.",
    visibility: false,
    execute(message) {
        guild.create(message.guild);
        debug.log(`Setup of the ${message.guild.name} Guild was successfully completed!`);
    }
}