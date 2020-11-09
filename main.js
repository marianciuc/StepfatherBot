const Discord       = require("discord.js");
const fs            = require("fs");

const bot           = new Discord.Client();
const commandFiles  = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

global.bot = bot;

require("./src/events")(Discord, commandFiles);
require("./src/closeness")(bot);
require("./src/properties/mongodb");


/**
 TODO fix some bugs [ empty id`s in database, - ]
 TODO realise welcome role system
 TODO realise webPage with admin panel
 **/