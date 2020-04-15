const Discord = re
quire('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.login(config.token);

bot.on("ready", () => {
    console.log(`bot start ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    });
});