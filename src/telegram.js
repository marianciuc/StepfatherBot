const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config()

const log = (message, filename) => {
        const newMessage = message + `\n\nFile: ${filename}\nProcess uptime: ${(bot.uptime / 1000 / 60 / 60 / 24).toFixed(2)}\nServer time: ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage?chat_id=-1001373973545&text=`
        let xhttp = new XMLHttpRequest();
        xhttp.open("get", url + newMessage, true);
        xhttp.send();
}

module.exports = { log };
