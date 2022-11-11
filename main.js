const { Client, GatewayIntentBits } = require('discord.js')
const fs            = require("fs");

const bot           = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]});
const commandFiles  = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

require('dotenv').config()
global.bot = bot;

require(__dirname + "/src/config/sequelize");
require(__dirname + "/src/events")();
require(__dirname + "/src/commands")(commandFiles);


/**
 TODO realise welcome role system
 TODO realise webPage with admin panel
 **/
