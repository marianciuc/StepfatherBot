const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const express = require('express');
const app = express();
const format = require("node.date-time");
const {prefix, token} = require("./config.json");
const package = require("./package.json");
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const servers = require('./servers.json');
const date = new Date();

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;

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
bot.login(token).then(r => console.log("Login successful"));

bot.once("ready", () => {
    if (prefix != '?'){
        log("[" + date.format("Y-M-d H:m:S") + "]" + ` ${bot.user.username} has started`);
        bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
            log(link);
        }).catch(error => log(error));
    }

    let count = 0;
    for (let guild of bot.guilds.cache) {
        guild.map(guild => {
            if (guild.memberCount) {
                count += guild.memberCount;
            }
        });
    }

    for (let channel of bot.channels.cache) {
        channel.map(channel => {
            if (channel && channel != null && channel.type == "voice") {
                if (servers[channel.guild.id] || servers[channel.guild.id].channelId == channel.parent.id){
                    if (channel.id != servers[channel.guild.id].channelId){
                        if (channel.viewable === false){
                            console.log(channel.name);
                        }
                    }
                }
            }
        });
    }
    bot.user.setActivity(`${count} members`, {type: 'LISTENING'});
});


//message listener
bot.on("message", async (message) => {
    let newPrefix = prefix;
    if (servers[message.guild.id].prefix){
        newPrefix = servers[message.guild.id].prefix;
    }
    if (!message.guild && message.author.bot && !message.content.startsWith(newPrefix)) return;
    const args = message.content.toLowerCase().slice(newPrefix.length).split(/ +/);
    if (message.content.substr(0, newPrefix.length) != newPrefix) return;
    const command = args.shift();

    switch (command) {
        case "help":
            bot.commands.get('help-menu').execute(message, newPrefix);
            return 0;
        case "purge":
            bot.commands.get('clear-chat').execute(message);
            return 0;
        case "embed":
            bot.commands.get('embeddedMessage').execute(message);
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
            bot.commands.get('bug').execute(message, newPrefix, bot);
            return 0;
        case "yn":
            bot.commands.get('yon').execute(message, newPrefix);
            return 0;
        case "getserverlist":
            bot.commands.get('get-server-list').execute(message, bot);
            return 0;
        case "sug":
            bot.commands.get('suggestions').execute(message, newPrefix, bot);
            return 0;
        case "connect":
            bot.commands.get('private-help').execute(message, newPrefix);
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
        case "manage":
            switch (args[0]) {
                case "help":
                    bot.commands.get('manage-help').execute(message);
                    return 0;
                case "prefix":
                    bot.commands.get('change-prefix').execute(message, args);
                    return 0;
                case "welcome":
                    bot.commands.get('add-welcome').execute(message, args);
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
        log(`Changed status to ${count} members`);
    } else if (sq > 50) {
        bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
        log(`Changed status to ${bot.guilds.cache.size} servers`);
    }

}, hour / 2);

//Closeness function
bot.on("voiceStateUpdate", (oldState, newState) => {
    if (prefix == '?') return;
    if (!oldState.channel) {//checking VoiceState status

        let guildId = newState.channel.guild.id; //Getting guild id

        if (servers[guildId] || servers[guildId].channelId == newState.channel.parent.id) {
            if (servers[guildId].channelId == newState.channel.id) { //cloning channel
                newState.channel.clone({
                    name: newState.member.user.username + " 🔓",
                    reason: 'Closeness function activated.',
                    userLimit: servers[newState.channel.guild.id].limit
                }).then(clone => {
                    newState.setChannel(clone, "Closeness function activated.").catch(error => {
                        console.error(error)
                    });
                    let interval = setInterval(() => {
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


//Member add
bot.on('guildMemberAdd', member => {
    if (servers[member.guild.id] && servers[member.guild.id].welcome_channel) {
        bot.channels.fetch(`${servers[member.guild.id].welcome_channel}}`).then(channel => {
            channel.send(`Hello, ***${member.user.tag}***`);
        });
    }
});

//Member out
bot.on("guildMemberRemove", member => {
    if (servers[member.guild.id] && servers[member.guild.id].welcome_channel) {
        bot.channels.fetch(`${servers[member.guild.id].welcome_channel}}`).then(channel => {
            channel.send(`***${member.user.tag}*** has been leaved from the server`);
        });
    }
});

//Listener for bot add to the server
bot.on("guildCreate", guild => {

    bot.user.setActivity(`!help`,{type: 'LISTENING'});
    servers[guild.id] = {
        categoriesId: undefined,
        channelId: undefined,
        limit: 2,
        prefix: prefix,
        welcome_channel: undefined
    }
    fs.writeFile("servers.json", JSON.stringify(config), (error) => {
        if (error) console.log(error.message)
    });
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
        channel.send(embed).catch(err => console.error(err));
    });
});

//Bot removed from the server
bot.on("guildDelete", guild => {

    bot.user.setActivity(`Serving ${bot.guilds.cache.size} servers`);

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
        channel.send(embed).catch(err => console.error(err));
    });
});


//bot log

let log = (text) => {
    bot.channels.fetch(`722474315886362735`).then(channel => {
        channel.send(`${text}`);
    });
}

bot.on("error", (error) => {
    log(`${error}`);
});