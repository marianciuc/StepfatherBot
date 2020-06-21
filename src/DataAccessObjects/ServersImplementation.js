const Server = require("../Models/Server.js");
const mysql = require("mysql2");
const debug = require('../Debug.js');
const properties = require('../../databse.json');


const mysqlConfig = {
    host: properties.host,
    user: properties.user,
    password: properties.password,
    database: properties.database,
    multipleStatements: true
};

const Connections = mysql.createPool(mysqlConfig);

function Query(bot, id) {
    return new Promise((resolve) => {

        Connections.query("SELECT * FROM guilds WHERE guild_id = ?",id, processOutput);

        function processOutput(err, results, fields) {
            if (err){
                debug.log(bot, err);
                return null;}

            return resolve(results, fields);
        }
    });
}

QueryInit = async function (bot, id) {
    const promise = await Query(bot, id);
    if (promise.length < 1){
        return null;
    }
    const serverObj = new Server(promise[0].guild_id, promise[0].private_category_id, promise[0].private_channel_id, promise[0].prefix,
        promise[0].welcome_channel_id, promise[0].telegram_channel_id, promise[0].log_channel_id, promise[0].private_channel_limit, promise[0].custom_welcome_image_url)

    return serverObj;
}
module.exports.QueryInit = QueryInit;


function addToDataBase(bot, Server) {
    const sql = "INSERT INTO guilds (guild_id, private_category_id, private_channel_id, prefix, welcome_channel_id" +
        ", telegram_channel_id, log_channel_id, private_channel_limit) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    const data = [Server.guild_id, Server.private_category_id, Server.private_channel_id, Server.prefix, Server.welcome_channel_id, Server.telegram_channel_id,
        Server.log_channel_id, Server.private_channel_limit, Server.custom_welcome_image_url];
    Connections.query(sql, data, function(err) {
        if(err) debug.log(bot, err);
    });
}

module.exports.addToDataBase = addToDataBase;


function removeFromDataBase(bot, guild_id) {
    const sql = "DELETE FROM guilds WHERE guild_id=?";
    const data = [guild_id];
    Connections.query(sql, data, function(err) {
        if(err) debug.log(bot,err);
    });
}

module.exports.removeFromDataBase = removeFromDataBase;


function updateGuild(bot, type, param, id) {
    const sql = `UPDATE guilds SET ${type}=? WHERE guild_id=?`;
    const data = [param, id];
    Connections.query(sql, data, function(err, results) {
        if(err) debug.log(bot, err);
    });
}
module.exports.updateGuild = updateGuild;