const telegram = require('./Telegram');

module.exports.log = function(bot, message){
    bot.channels.fetch(`722474315886362735`).then(channel => {
        channel.send(`${message}`);
    });
    telegram.sendToTelegram(bot,message);
}