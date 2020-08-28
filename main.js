const Discord       = require("discord.js");
const database      = require("./src/DataAccessObjects/ServersImplementation");
const databaseJson  = require("./databse.json");
const debug         = require('./src/Debug');
const express       = require('express');
const fs            = require("fs");
const mysql         = require("mysql2");
const Guild         = require("./src/commands/Guild.js");

const app           = express();
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

app.set('port', (process.env.PORT || 5000));

const cors = require('cors');
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    accept: "*",
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
    noCors: true,
};
app.use(cors(corsOptions));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if ('OPTIONS' == req.method) {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.post('/', function (request, response) {
    app.post('/', ((request, response) => (arrayApiTest.push(request.body))));
    response.json(request.body);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

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

app.get('/api/getCommands', (req, res) => {
    let commands = [];
    for (const file of commandFiles) {
            const command = require(`./src/commands/${file}`);
            commands.push({commandCall: command.name, description: command.description});
        }
    res.json(commands);
});
/**
 TODO fix some bugs [ empty id`s in database, - ]
 TODO realise welcome role system
 TODO realise webPage with admin panel
 **/