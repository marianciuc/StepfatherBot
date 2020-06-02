const Discord = require("discord.js");
var mysql = require("mysql");
const bot = new Discord.Client();
var fs = require("fs");
const format = require("node.date-time");
const {prefix, token, DATABASE_PASSWORD, DATABASE_URL, DATABASE_USERNAME, DATABASE_NAME} = require("./config.json");
const package = require("./package.json");
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const servers = require('./servers.json');
let date = new Date();
!function () {
    for (let file of commandFiles) {
        try {
            
            let command = require(`./commands/${file}`);
            bot.commands.set(command.name, command);
            console.log(`Added ${command.name}.`)
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log(`Added ${bot.commands.size} files.`)
}();
var connection = mysql.createConnection({
    host: DATABASE_URL,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
});
bot.login(token);
bot.once("ready", () => {
    log("readme", "[" + date.format("Y-M-d H:m:S") + "]" + ` ${bot.user.username} has started\n`, true);
    bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
        console.log(link);
    });
    console.log("Bot author: " + package.author + "\nVersion: " + package.version);
    bot.user.setActivity(` ${bot.guilds.cache.size} servers`, {type: "LISTENING"});
});
bot.on("message", async (message) => {
    log("readme", "Chat log " + "[" + date.format("Y-M-d H:m:S") + "]" + "[" + message.guild.name + "]" + " [" + message.author.username + "]: " + message.content + "\n", true);
    if (!message.guild && message.author.bot && !message.content.startsWith(prefix)) return;
    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    const command = args.shift();
    switch (command) {
        case "help":
            bot.commands.get('help-menu').execute(message);
            return 0;
        case "purge":
            bot.commands.get('clear-chat').execute(message);
            return 0;
        case "avatar":
            bot.commands.get('get-user-image').execute(message);
            return 0;
        case "rand":
            bot.commands.get('random').execute(message.content, message);
            return 0;
        case "flip":
            bot.commands.get('coin-flip').execute(message, bot);
            return 0;
        case "connect":
            bot.commands.get('private-help').execute(message);
            return 0;
        case "private":
            switch (args[0]) {
                case "add":
                    bot.commands.get('add-private-room').execute(args, message);
                    return 0;
                case "limit":
                    bot.commands.get('change-limit-for-private-rooms').execute(args, message);
                    return 0;
            }
    }
});
bot.on("voiceStateUpdate", (oldState, newState) => {
    if (!oldState.channel) {
        let guildId = newState.channel.guild.id;
        if (servers[guildId] || servers[guildId].channelId == newState.channel.parent.id) {
            if (servers[guildId].channelId == newState.channel.id) {
                newState.channel.clone({
                    name: newState.member.user.username + " 🔓",
                    reason: 'Closeness function activated.',
                    userLimit: servers[newState.channel.guild.id].limit
                }).then(clone => {
                    newState.setChannel(clone, "Closeness function activated.");
                    interval = setInterval(() => {
                        if (clone.members.size < 1 || !clone) {
                            clone.delete("All users leave.").catch(err => console.error(err.message));
                            clearInterval(interval);
                            return;
                        }
                        if (!clone.full) {
                            clone.setName(newState.member.user.username + " 🔓").catch(err => console.error(err.message));
                        } else if (clone.full) {
                            clone.setName(newState.member.user.username + " 🔐").catch(err => console.error(err.message));
                        }
                    }, 5000);
                })
                return;
            }
        }
    }
});

function log(LogNameFile, loggedMessage, boolean) {
    fs.appendFileSync('./logger/' + LogNameFile + '.log', loggedMessage);
    if (boolean) {
        console.log(loggedMessage)
    }
    ;
}
bot.on("guildCreate", guild => {
    log(GuildAdd & Remove, `New guild joined: ${guild.name}[id_${guild.id}]. This guild has ${guild.memberCount} members`, true);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});
bot.on("guildDelete", guild => {
    log(GuildAdd & Remove, `I have been removed from: ${guild.name}[id_${guild.id}].`, true);
    bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});


