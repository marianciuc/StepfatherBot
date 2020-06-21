const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const telegram = require("../telegram.json");

module.exports.sendToTelegram = function(bot, message){
    const url = `https://api.telegram.org/bot${telegram.token}/sendMessage?chat_id=-1001373973545&text=`
    let xhttp = new XMLHttpRequest();
    xhttp.open("get", url + message, true);
    xhttp.send();
}