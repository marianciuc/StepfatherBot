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
    let result = 'App is running'
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
    log("readme", "[" + date.format("Y-M-d H:m:S") + "]" + ` ${bot.user.username} has started\n`, true);

    bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
        console.log(link);
    });

    console.log("Bot author: " + package.author + "\nVersion: " + package.version);

    for (let channel of bot.channels.cache) {
        channel.map(channel => {
            if (channel.parentID && channel.categoriesId && channel.parentID == servers[channel.guild.id].categoriesId && channel.id != servers[channel.guild.id].channelId) {
                channel.delete("All users leave.").catch(err => console.error(err.message));
            }
        });
    }

    let count = 0;
    for (let guild of bot.guilds.cache) {
        guild.map(guild => {
            if (guild.memberCount) {
                count += guild.memberCount;
            }
        });
        bot.user.setActivity(`${count} members`, {type: 'LISTENING'});
    }
});

//message listener
bot.on("message", async (message) => {
    //checking for commands
    if (!message.guild && message.author.bot && !message.content.startsWith(prefix)) return;
    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    if (message.content.substr(0, prefix.length) != prefix) return;
    const command = args.shift();

    switch (command) {
        case "help":
            bot.commands.get('help-menu').execute(message);
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
        case "connect":
            bot.commands.get('private-help').execute(message, bot);
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
                // case "welcome":
                //     bot.commands.get('change-limit-for-private-rooms').execute(args, message);
                //     return 0;
            }
            return 0;
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
            bot.user.setActivity(`${count} members`, {type: 'LISTENING'});
        }
    } else if (sq > 50) {
        bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
    }

    console.log("changed status");

}, hour/2);

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

//log function
function log(LogNameFile, loggedMessage, boolean) {
    if (boolean) console.log(loggedMessage);
}


//Member add
bot.on('guildMemberAdd', member => {
    if (servers[member.guild.id] && servers[member.guild.id].welcomeChannelId) {
        member.guild.channels.cache.get(`${servers[member.guild.id].welcomeChannelId}`).then(channel => {
            channel.send("Hello");
        })
    }
});

//Listener for bot add to the server
bot.on("guildCreate", guild => {

    bot.user.setActivity(`Serving ${bot.guilds.cache.size} servers`);

    bot.channels.fetch("721354911161254009").then(channel => {
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

    bot.channels.fetch("721354911161254009").then(channel => {
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