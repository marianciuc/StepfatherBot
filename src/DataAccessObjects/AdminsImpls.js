const Admins = require("../Models/AdminUser.js");
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

function Query(bot, username) {
    return new Promise((resolve) => {

        Connections.query("SELECT * FROM Admins WHERE username = ?", username, processOutput);

        function processOutput(err, results, fields) {
            if (err) {
                debug.log(bot, err);
                return null;
            }

            return resolve(results, fields);
        }
    });
}

QueryInit = async function (bot, id) {
    const promise = await Query(bot, id);

    if (promise.length < 1) {
        return null;
    }
    const serverObj = new Admins(promise[0].id, promise[0].username, promise[0].password);
    return serverObj;
}
module.exports.QueryInit = QueryInit;