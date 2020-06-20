const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const express = require('express');
const app = express();
const {prefix, token} = require("./config.json");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const date = new Date();
const telegram = require("./modules/Telegram");
const log = require('./modules/log');
const mysql = require("mysql2");
const server = require("./modules/server");
const database = require("./modules/DataBase");

const minute = 1000 * 60;
const hour = minute * 60;

//Activate app
app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    let result = 'Bot is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});


//Getting commands
bot.commands = new Discord.Collection();
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

//Bot login
bot.login(token).then(() => console.log("Login successful"));

const connection = mysql.createConnection({
    host: "45.80.71.154",
    user: "rootstep",
    database: "stepfather_discord_bot",
    password: "Vovik1596@"
});
connection.connect(function(err){
    if (err) {
        return log.log(bot,"Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

bot.once("ready", async () => {

    let count = 0;
    for (let guild of bot.guilds.cache) {
        guild.map(guild => {
            if (guild.memberCount) {
                count += guild.memberCount;
            }
        });
    }
    await bot.user.setActivity(`${count} members`, {type: 'LISTENING'});

    if (prefix != '?') {
        for (let channel of bot.channels.cache) {
            channel.map(async channel => {
                if (channel && channel != null && channel.type == "voice") {

                    let Server = await database.QueryInit(bot, channel.guild.id);

                    if (Server != null && Server.private_channel_id != null && Server.private_category_id != null && channel.parent.id && Server.private_category_id == channel.parent.id) {

                        if (channel.id != Server.private_channel_id) {
                            let count = 0;
                            channel.members.map(member => {
                                count++;
                            })
                            if (count == 0) {
                                channel.delete("All users leave.").catch(err => log.log(bot,err.message));
                            } else {
                                let delInt = setInterval(() => {
                                    let count = 0;
                                    if (channel) {
                                        channel.members.map(member => {
                                            count++;
                                        });
                                        if (count == 0) {
                                            channel.delete("All users leave.").catch(err => log.log(bot,err.message));
                                            clearInterval(delInt);
                                        }
                                    }
                                }, 2000);
                            }
                        }
                    }
                }
            });
         }
        log.log(bot,`${bot.user.username} has started`);
    }
});


//message listener
bot.on("message", async (message) => {
    if (!message.guild && !message.author.bot) return;

    if (message.author.bot || message.content.substr(0, 1) !== '!') return;

    if (message.channel.id == 722474604530106458 && prefix != '?') return;

    //Create object server from database
        let Server = await database.QueryInit(bot, message.guild.id);
        if (Server == null) {
            if (!message.author.bot) {
                if (message.content == `!configure`) {
                    bot.commands.get('configure').execute(message, bot);
                    await message.reply(`Guild has been configured.`);
                    return;
                }
                await message.reply("Type '!configure' for configure your guild and fix this message.");
                return;
            }
            return 0;
    }
    if (!message.guild && message.author.bot && !message.content.startsWith(Server.prefix)) return;

    const args = message.content.toLowerCase().slice(Server.prefix.length).split(/ +/);

    if (message.content.substr(0, Server.prefix.length) !== Server.prefix) return;

    const command = args.shift();

    switch (command) {
        case "help":
            bot.commands.get('help-menu').execute(message, Server.prefix);
            return 0;
        case "purge":
            bot.commands.get('clear-chat').execute(message);
            return 0;
        case "embed":
            bot.commands.get('embeddedMessage').execute(message, Server.prefix);
            return 0;
        case "avatar":
            bot.commands.get('get-user-image').execute(message);
            return 0;
        case "rand":
            bot.commands.get('random').execute(message.content, message);
            return 0;
        case "flip":
            bot.commands.get('coin-flip').execute(message);
            return 0;
        case "bug":
            bot.commands.get('bug').execute(message, Server.prefix, bot);
            return 0;
        case "yn":
            bot.commands.get('yon').execute(message, Server.prefix);
            return 0;
        case "getserverlist":
            bot.commands.get('get-server-list').execute(message, bot);
            return 0;
        case "sug":
            bot.commands.get('suggestions').execute(message, Server.prefix, bot);
            return 0;
        case "connect":
            bot.commands.get('private-help').execute(message, Server.prefix);
            return 0;
        case "private":
            switch (args[0]) {
                case "add":
                    bot.commands.get('add-private-room').execute(args, message, bot);
                    return 0;
                case "limit":
                    bot.commands.get('change-limit-for-private-rooms').execute(args, message, bot);
                    return 0;
            }
        case "manage":
            switch (args[0]) {
                case "help":
                    bot.commands.get('manage-help').execute(message, bot);
                    return 0;
                case "prefix":
                    bot.commands.get('change-prefix').execute(message, args, bot);
                    return 0;
                case "welcome":
                    bot.commands.get('add-welcome').execute(message, args, bot);
                    return 0;
            }
            return 0;
        case "status":
            bot.commands.get('bot-info').execute(message, bot);
    }
});

let intervalStatus = setInterval(() => {
    let sq = Math.floor(Math.random() * 100);
    if (sq < 50) {
        let count = 0;
        for (let guild of bot.guilds.cache) {
            guild.map(guild => {
                if (guild.memberCount) {
                    count += guild.memberCount;
                }
            });
        }
        bot.user.setActivity(`${count} members`, {type: 'LISTENING'});
    } else if (sq > 50) {
        bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
    }

}, hour / 2);

//Closeness function
bot.on("voiceStateUpdate", async (oldState, newState) => {
    if (prefix == '?'){return;}
    if (!oldState.channel) {//checking VoiceState status

        let guildId = newState.channel.guild.id; //Getting guild id

        let Server = await database.QueryInit(bot, guildId);
        if (Server == null) return;

        if (Server.private_channel_id != null && newState.channel.parent.id && Server.private_category_id == newState.channel.parent.id) {
            if (Server.private_channel_id == newState.channel.id) { //cloning channel
                newState.channel.clone({
                    name: newState.member.user.username + " 🔓",
                    reason: 'Closeness function activated.',
                    userLimit: Server.private_channel_limit
                }).then(clone => {
                    newState.setChannel(clone, "Closeness function activated.").catch(error => {
                        log.log(bot,error.message)
                    });
                    clone.overwritePermissions([
                        {
                            id: newState.member.user.id,
                            allow: ['MANAGE_CHANNELS'],
                        },
                    ], 'Needed to change permissions');
                    let interval = setInterval(() => {
                        if (clone.members.size < 1 || !clone) {
                            clone.delete("All users leave.").catch(err => log.log(bot,err.message));
                            clearInterval(interval);
                            return;
                        }
                        if (!clone.full) {
                            clone.setName(newState.member.user.username + " 🔓").catch(err => log.log(bot,err.message));
                        } else if (clone.full) {
                            clone.setName(newState.member.user.username + " 🔐").catch(err => log.log(bot,err.message));
                        }
                    }, 5000);
                })
                return 0;
            }
        }
    }
});


//Member add
bot.on('guildMemberAdd', async member => {

    let Server = await database.QueryInit(bot, member.guild.id);
    if (Server == null) return;

    if (Server.welcome_channel_id != null) {
        bot.channels.fetch(`${Server.welcome_channel_id}`).then(channel => {
            channel.send(`Hello, ***${member.user.tag}***`);
        });
    }
});

//Member out
bot.on("guildMemberRemove", async member => {

    let Server = await database.QueryInit(bot, member.guild.id);
    if (Server == null) return;

    if (Server.welcome_channel_id != null) {
        bot.channels.fetch(`${Server.welcome_channel_id}`).then(channel => {
            channel.send(`***${member.user.tag}*** has been leaved from the server`);
        });
    }
});

//Listener for bot add to the server
bot.on("guildCreate", guild => {
    telegram.sendToTelegram(bot,`${guild.name} add bot to server.\n ${guild.memberCount} members`);

    bot.user.setActivity(`!help`, {type: 'LISTENING'});

    let Server = new server(guild.id, null, null, "!", null,
        null, null, 2);
    database.addToDataBase(bot, Server);

    bot.channels.fetch("722474553372180641").then(channel => {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`**${guild.name}**`, `https://i.ibb.co/RQt9WNH/add-server-logo-512x512.png`)
            .setTitle("Added to server.")
            .setColor(0xffd63e)
            .addFields(
                {
                    name: 'Basic',
                    value: `**Server name:** ${guild.name}(${guild.id})\n`
                        + `**Server owner:** ${guild.owner.user.tag}`,
                    inline: true
                }, {
                    name: 'Other',
                    value: `**Members: **${guild.memberCount}`,
                    inline: false
                },
            );
        channel.send(embed).catch(err => log.log(bot,err.message));
    });
});

//Bot removed from the server
bot.on("guildDelete", guild => {

    database.removeFromDataBase(guild, guild.id);

    bot.user.setActivity(`Serving ${bot.guilds.cache.size} servers`);
    telegram.sendToTelegram(bot,`${guild.name} remove bot from server.`);
    bot.channels.fetch("722474553372180641").then(channel => {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`**${guild.name}**`, `https://i.ibb.co/RQt9WNH/add-server-logo-512x512.png`)
            .setTitle("Removed from server.")
            .setColor(0xffd63e)
            .addFields(
                {
                    name: 'Basic',
                    value: `**Server name:** ${guild.name}(${guild.id})\n`
                        + `**Server owner:** ${guild.owner.user.tag}`,
                    inline: true
                }, {
                    name: 'Other',
                    value: `**Members: **${guild.memberCount}`,
                    inline: false
                },
            );
        channel.send(embed).catch(err => log.log(bot,err.message));
    });
});


//bot log
bot.on("error", (error) => {
    log.log(bot,`${error}`);
});

//