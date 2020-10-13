const Discord       = require("discord.js");
const database      = require("./src/DataAccessObjects/ServersImplementation");
const databaseJson  = require("./databse.json");
const debug         = require('./src/Debug');
const express       = require('express');
const fs            = require("fs");
const mysql         = require("mysql2");
const Guild         = require("./src/commands/Guild.js");

const bot           = new Discord.Client();
const commandFiles  = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const minute = 1000 * 60;
const hour = minute * 60;

require("./src/MainEvents")(bot, Discord, database, Guild, commandFiles);
require("./src/Closeness")(bot, database);

/**
 * Checking for database connection.
 * @type {Connection}
 */

const connection = mysql.createConnection({
    host: databaseJson.host,
    user: databaseJson.user,
    database: databaseJson.database,
    password: databaseJson.password
});
connection.connect(function(err){
    if (err) {
        return debug.log(bot,"Error: " + err.message);
        exitOnError("Database offline");
    }
    else{
        console.log("Successfully connected to database.");
    }
});
/**
 TODO fix some bugs [ empty id`s in database, - ]
 TODO realise welcome role system
 TODO realise webPage with admin panel
 **/