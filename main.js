const Discord       = require("discord.js");
const fs            = require("fs");

const bot           = new Discord.Client();
const commandFiles  = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

global.bot = bot;

require(__dirname + "/src/events")(Discord, commandFiles);
require(__dirname + "/src/closeness")(bot);
require(__dirname + "/src/config/mongodb");
require(__dirname + "/src/status");


/**
 TODO realise welcome role system
 TODO realise webPage with admin panel
 **/
