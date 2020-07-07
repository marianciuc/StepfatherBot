const Discord       = require("discord.js");
const bodyParser    = require('body-parser')
const canvas        = require("./src/commands/GetWelcomeCanvas");
const database      = require("./src/DataAccessObjects/ServersImplementation");
const databaseJson  = require("./databse.json");
const debug         = require('./src/Debug');
const express       = require('express');
const fs            = require("fs");
const mysql         = require("mysql2");
const server        = require("./src/Models/Server");
const telegram      = require("./src/Telegram");
const Guild         = require("./src/commands/Guild.js");
const {prefix, token} = require("./config.json");

const app           = express();
const bot           = new Discord.Client();
const commandFiles  = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const minute = 1000 * 60;
const hour = minute * 60;

//Activate app
app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    const result = 'Bot is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

/**
 * Getting commands from ./src/commands/...
 * @type {module:"discord.js".Collection<K, V>}
 */
bot.commands = new Discord.Collection();
!function () {
    for (const file of commandFiles) {
        try {
            const command = require(`./src/commands/${file}`);
            bot.commands.set(command.name, command);
            console.log(`Added ${command.name}, ${command.description}`)
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log(`Added ${bot.commands.size} files.`)
}();

/**
 * Discord client authentication with token.
 */
bot.login(token).then(() => console.log("Login successful"));

/**
 * Checking for database connection.
 * @type {Connection}
 */
const connection = mysql.createConnection({
    host: databaseJson.host,
    user: databaseJson.user,
    database: databaseJson.database,
    password: databaseJson.password
});
connection.connect(function(err){
    if (err) {
        return debug.log(bot,"Ошибка: " + err.message);
    }
    else{
        console.log("Successfully connected to database.");
    }
});

/**
 * Where bot has been started we call for this function.
 *
 * This function:
 * Counting guilds and members, change bot activity, checking for private channels available,
 * if private channel is available, function create interval @delInt {CONST delInt}.
 */
bot.once("ready", async () => {

    let count = 0;

    for (const guild of bot.guilds.cache) {
        guild.map(guild => {
            if (guild.memberCount) {
                count += guild.memberCount;
            }
        });
    }
    await bot.user.setActivity(`${count} members`, {type: 'LISTENING'});

    if (prefix !== '?') {
        for (const channel of bot.channels.cache) {
            channel.map(async channel => {
                if (channel && channel != null && channel.type === "voice") {

                    const Server = await database.QueryInit(bot, channel.guild.id);

                    if (Server != null && Server.private_channel_id != null && Server.private_category_id != null && channel.parent.id && Server.private_category_id == channel.parent.id) {

                        if (channel.id != Server.private_channel_id) {
                            let count = 0;
                            channel.members.map(member => {
                                count++;
                            })
                            if (count == 0) {
                                channel.delete("All users leave.").catch(err => debug.log(bot,err.message));
                            } else {
                                const delInt = setInterval(() => {
                                    let count = 0;
                                    if (channel) {
                                        channel.members.map(member => {
                                            count++;
                                        });
                                        if (count == 0) {
                                            channel.delete("All users leave.").catch(err => debug.log(bot,err.message));
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
        debug.log(bot,`${bot.user.username} has started`);
    }
});


/**
 * Message event listener
 */
bot.on("message", async (message) => {
    if (!message.guild && !message.author.bot){
        const privateMessage = await new Discord.MessageEmbed()
            .setAuthor(bot.user.username)
            .setDescription("To use the bot, just write `!Help` to the chat of your guild.\n" +
                "Join our guild [here](https://discord.gg/mUnUzWt).\n" +
                "To connect the bot to your guild, follow the [link](https://discordapp.com/oauth2/authorize?client_id=700113613825769522&scope=bot&permissions=2146958839)")
            .setColor(0xffd63e)
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();
        await message.author.send(privateMessage);
        return 0;
    }

    if (message.channel.id == 722474604530106458 && prefix != '?' || message.author.bot) return;

    //Create object server from database
        const Server = await database.QueryInit(bot, message.guild.id);//function return null if guild not registered on database

        if (Server == null) {//checking for presence
            if (message.author.bot || message.content.substr(0, 1) !== '!') return;
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
    if (!message.guild || message.author.bot || !message.content.startsWith(Server.prefix)) return;

    const args = message.content.toLowerCase().slice(Server.prefix.length).split(/ +/);//regex

    const command = args.shift();//delete prefix form args

    console.log(args);

    switch (command) {
            //Getting main help menu +
        case "help":
            bot.commands.get('help-menu').getMainHelp(message, Server.prefix);
            return 0;
            //Clear chat function +
        case "purge":
            bot.commands.get('clear-chat').execute(message);
            return 0;
        case "guild":
            await Guild.getGuildInfo(bot, message, true, 's');
            return 0;
        case "gid":
            await Guild.getGuildInfoById(bot, args[0], message);
            return 0;
            //Embedded chat function +
        case "embed":
            bot.commands.get('embeddedMessage').execute(message, Server.prefix);
            return 0;
            //Get users avatars +
        case "avatar":
            bot.commands.get('get-user-image').execute(message);
            return 0;
            //Get rand value +
        case "rand":
            bot.commands.get('random').getRandomValue(message.content, message);
            return 0;
            //Get head or tails +
        case "flip":
            bot.commands.get('random').flip(message);
            return 0;
            //Send report +
        case "bug":
            bot.commands.get('service').execute(message, Server.prefix, bot, "bug");
            return 0;
            //Get yes or not +
        case "yn":
            bot.commands.get('random').getYesOrNot(message, Server.prefix);
            return 0;
            //Get servers list +
        case "gsl":
            bot.commands.get('bot-info').getServersList(message, bot);
            return 0;
            //Send sug message +
        case "sug":
            bot.commands.get('service').execute(message, Server.prefix, bot, "sug");
            return 0;
            //Get private help +
        case "connect":
            bot.commands.get('help-menu').getPrivateHelp(message, Server.prefix);
            return 0;
            //Private menu switch +
        case "private":
            switch (args[0]) {
                    //Add private channel
                case "add":
                    await bot.commands.get('private').addPrivateRoom(args, message, bot);
                    return 0;
                    //Change private limit +
                case "limit":
                    bot.commands.get('private').changeLimit(args, message, bot);
                    return 0;
                default:
                    await message.reply(`Use \`${Server.prefix}connect\` to get private help list`);
                    return 0;
            }
        case "manage":
            switch (args[0]) {
                case "help":
                    bot.commands.get('help-menu').getManageHelp(message, Server.prefix);
                    return 0;
                case "prefix":
                    bot.commands.get('change-prefix').execute(message, args, bot);
                    return 0;
                case "welcome":
                    switch (args[1]){
                        case "add":
                            await bot.commands.get('welcome').changeWelcomeChannel(message, args[2], bot);
                            return 0;
                        case "image":
                            bot.commands.get('welcome').changeWelcomeChannelImage(message, bot, args[2]);
                            return 0;
                        case "help":
                            await bot.commands.get('help-menu').getWelcomeList(message);
                            return 0;
                    }
                default:
                    await message.reply(`Use \`${Server.prefix}manage help\` to get help list`);
                    return 0;
            }
            return 0;
        case "status":
            bot.commands.get('bot-info').getOsInfo(message, bot);
    }
});

let intervalStatus = setInterval(() => {
    const sq = Math.floor(Math.random() * 100);
    if (sq < 50) {
        let count = 0;
        for (const guild of bot.guilds.cache) {
            guild.map(guild => {
                if (guild.memberCount) {
                    count += guild.memberCount;
                }
            });
        }
        bot.user.setActivity(`${count} members`, {type: 'LISTENING'}).then(r => console.log("changed"));
    } else if (sq > 50) {
        bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'}).then(r => console.log("changed"));;
    }

}, hour / 2);

/**
 * Closeness function
 */
bot.on("voiceStateUpdate", async (oldState, newState) => {
    if (prefix != '?'){
    if (!oldState.channel || newState && newState.channel) {//checking VoiceState status

        const guildId = newState.channel.guild.id; //Getting guild id

        const Server = await database.QueryInit(bot, guildId);
        if (Server == null) return;

        if (Server.private_channel_id != null && newState.channel.parent.id && Server.private_category_id == newState.channel.parent.id) {
            if (Server.private_channel_id == newState.channel.id) { //cloning channel
                newState.channel.clone({
                    name: newState.member.user.username + " 🔓",
                    reason: 'Closeness function activated.',
                    userLimit: Server.private_channel_limit
                }).then(clone => {
                    newState.setChannel(clone, "Closeness function activated.").catch(error => {
                        debug.log(bot,error.message)
                    });
                    clone.overwritePermissions([
                        {
                            id: newState.member.user.id,
                            allow: ['MANAGE_CHANNELS'],
                        },
                    ], 'Needed to change permissions');
                    let interval = setInterval(() => {
                        if (!clone || clone.members.size < 1) {
                            clone.delete("All users leave.").catch(err => debug.log(bot,err.message));
                            clearInterval(interval);
                            return;
                        }
                        if (!clone.full) {
                            clone.setName(newState.member.user.username + " 🔓").catch(err => debug.log(bot,err.message));
                        } else if (clone.full) {
                            clone.setName(newState.member.user.username + " 🔐").catch(err => debug.log(bot,err.message));
                        }
                    }, 5000);
                })
                return 0;
            }
        }
    }
    }
});


//Member add
bot.on('guildMemberAdd', async member => {

    let Server = await database.QueryInit(bot, member.guild.id);
    if (Server == null) return;

    if (Server.welcome_channel_id != null) {
        await canvas.getWelcomeImage(member, bot, "add");
    }
});

/**
 * Member out
 */
bot.on("guildMemberRemove", async member => {

    const Server = await database.QueryInit(bot, member.guild.id);
    if (Server == null) return;

    if (Server.welcome_channel_id != null) {
        await canvas.getWelcomeImage(member, bot, "remove");
    }
});

//Listener for bot add to the server
bot.on("guildCreate",  guild => {
    telegram.sendToTelegram(bot,`${guild.name} add bot to server.\n ${guild.memberCount} members`);

    bot.user.setActivity(`!help`, {type: 'LISTENING'});

    const message = new Discord.MessageEmbed()
        .setDescription(`To connect the bot to your server and use private chat function write:` + "```c\n" + prefix + "connect```")
        .setAuthor("🤖 Stepfather Help list",)
        .setColor(0xffd63e)
        .addFields(
            {
                name: '\u200B', value: "\n" +
                    "Get a list of guild administration help (configure the welcome channel, change the bot prefix for the server, and much more)" +
                    "\n```js\n" + prefix + "manage help```", inline: false
            },
            {name: '\u200B', value: "Send bug report ```" + prefix + "bug <report text>```", inline: true},
            {
                name: '\u200B',
                value: "Send suggestions message ```" + prefix + "sug <suggestions message>```",
                inline: true
            },
            {name: '\u200B', value: "Show a list of commands ```" + prefix + "help```", inline: true},
            {name: '\u200B', value: "Yes or Not ```" + prefix + "yn <question>```", inline: true},
            {name: '\u200B', value: "Get bot info ```" + prefix + "status```", inline: true},
            {name: '\u200B', value: "🐬 Flip a coin ```" + prefix + "flip```", inline: true},
            {name: '\u200B', value: "Private help list ```" + prefix + "connect```", inline: true},
            {name: '\u200B', value: "Delete last n messages ```" + prefix + "purge <n>```", inline: true},
            {
                name: '\u200B',
                value: "Get embedded message ```" + prefix + "embed <message content>```",
                inline: true
            },
            {
                name: '\u200B',
                value: "Get user image ```" + prefix + "avatar <@user>``` or ```" + prefix + "avarar <@user> <@user>```",
                inline: true
            },
            {
                name: '\u200B',
                value: "Generates a random number from 0 to the value you entered\n```js\n" + prefix + "random 20``````js\n@author, Value from 0 to 20 - 11```",
                inline: true
            },
        );

    guild.owner.send(message);

    const Server = new server(guild.id, null, null, "!", null,
        null, null, 2);
    database.addToDataBase(bot, Server);

    bot.channels.fetch("722474553372180641").then(channel => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${guild.name}`, "https://media1.tenor.com/images/83cdd1dd40cdb87020949e0f075b9648/tenor.gif?itemid=11230336")
            .setTitle("Added to server.")
            .setColor(0xffd63e)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: 'Basic:',
                    value: `**Server name:** ${guild.name}\n`
                        + `**Server id:** ${guild.id}\n`
                        + `**Server owner:** ${guild.owner.user.tag}`,
                    inline: true
                }, {
                    name: 'Other:',
                    value: `**Members: **${guild.memberCount}`,
                    inline: false
                },
            );
        channel.send(embed).catch(err => debug.log(bot,err.message));
    });
});

//Bot removed from the server
bot.on("guildDelete", guild => {
    database.removeFromDataBase(guild, guild.id);

    bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
    telegram.sendToTelegram(bot,`${guild.name} remove bot from server.`);

    //Fetching channels where id == "722474553372180641"
    bot.channels.fetch("722474553372180641").then(channel => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${guild.name}`, "https://media1.tenor.com/images/83cdd1dd40cdb87020949e0f075b9648/tenor.gif?itemid=11230336")
            .setTitle("Removed from server.")
            .setColor(0xffd63e)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: 'Basic',
                    value: `**Server name:** ${guild.name}\n`
                        + `**Server id:** ${guild.id}\n`
                        + `**Server owner:** ${guild.owner.user.tag}`,
                    inline: true
                }, {
                    name: 'Other',
                    value: `**Members: **${guild.memberCount}`,
                    inline: false
                },
            );
        channel.send(embed).catch(err => debug.log(bot,err.message));
    });
});


//bot debug
bot.on("error", (error) => {
    debug.log(bot,`${error}`);
});


bot.on("channelUpdate", (channel) =>{
    console.log(channel);
})