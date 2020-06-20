const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports.sendToTelegram = function(bot, message){
    const token = `1202079323:AAG4e9PiTHQpoI2OzACs6isGVVkKLIqBoH0`;
    let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=-1001373973545&text=`
    let xhttp = new XMLHttpRequest();
    xhttp.open("get", url + message, true);
    xhttp.send();
}