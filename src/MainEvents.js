const server        = require("../src/Models/Server");
const telegram      = require("../src/Telegram");
const debug         = require('../src/Debug');
const canvas        = require("../src/commands/GetWelcomeCanvas");

const minute = 1000 * 60;
const hour = minute * 60;

module.exports = (bot, Discord, database, Guild, commandFiles) => {
    /**
     * Getting commands from ./src/commands/...
     * @type {module:"discord.js".Collection<K, V>}
     */
    bot.commands = new Discord.Collection();
    !function () {
        for (const file of commandFiles) {
            try {
                const command = require(`../src/commands/${file}`);
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
    bot.login(process.env.DISCORD_TOKEN || "NzAwMTEzNjEzODI1NzY5NTIy.XupUdw.dqzVytTZ1sosYcH8o5pAb6KboKM").then(() => console.log(`Login successful\nName: ${bot.user.username}`));

    /**
     * Where bot has been started we call for this function.
     *
     * This function:
     * Counting guilds and members, change bot activity, checking for private channels available,
     * if private channel is available, function create interval.
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
        for (const channel of bot.channels.cache) {
            channel.map(async channel => {
                if (channel && channel != null && channel.type === "voice") {

                    const Server = await database.QueryInit(bot, channel.guild.id);

                    if (Server !== null && Server.private_channel_id != null && Server.private_category_id != null && channel.available && channel.parent.available && channel.parent.id.available && Server.private_category_id == channel.parent.id) {
                        if (channel.id != Server.private_channel_id) {
                            let count = 0;
                            channel.members.map(member => {
                                count++;
                            })
                            if (count == 0) {
                                channel.delete("All users leave.").catch(err => debug.log(bot, err.message));
                            } else {
                                const delInt = setInterval(() => {
                                    let count = 0;
                                    if (channel) {
                                        channel.members.map(member => {
                                            count++;
                                        });
                                        if (count == 0) {
                                            channel.delete("All users leave.").catch(err => debug.log(bot, err.message));
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
        debug.log(bot, `${bot.user.username} has started`);
    });

    /**
     * Message event listener
     */
    bot.on("message", async (message) => {
        if (!message.guild && !message.author.bot) {
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
        if (message.author.bot) return;

        const Server = await database.QueryInit(bot, message.guild.id);//function return null if guild not registered on database

        if (Server == null && message.content.startsWith("!")) {
            await bot.commands.get('configure').execute(message, bot);
            await message.reply(`Guild ${message.guild.name} has been configured. Type \`!help\` to use bot.`);
            return 0;
        }
        if (!message.content.startsWith(Server.prefix)) return;

        const args = message.content.toLowerCase().slice(Server.prefix.length).split(/ +/);//regex
        const command = args.shift();//delete prefix form args

        if (bot.commands.get(command)) {
            bot.commands.get(command).execute(message, Server.prefix, bot)
        }
        ;
    });

    const timeInterval = setInterval(() => {
        const timeArray = [
                            {date: "21:50", image: "", text: `@everyone !!! Уважаемые киберпроститутки!!! Через 10 минут начинаеться смена!!! Всем занять позиции!!!`},
                            {date: "23:10", image: "", text: `@everyone !!! Загадка жака Фреско через 20 минут в 23:30`},
                            {date: "23:40", image: "", text: `@everyone !!! Загадка жака Фреско через 20 минут в 0:10`},
                            {date: "0:30", image: "", text: `@everyone !!! Загадка жака Фреско через 20 минут в 0:50`},
                            {date: "1:10", image: "", text: `@everyone !!! Загадка жака Фреско через 20 минут в 1:30`},
                            {date: "1:50", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 2:10`},
                            {date: "2:30", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 2:50`},
                            {date: "3:10", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 3:30`},
                            {date: "4:30", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 4:50`},
                            {date: "5:10", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 5:30`},
                            {date: "5:50", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 6:10`},
                            {date: "6:30", image: "", text: `@everyone!!! Загадка жака Фреско через 20 минут в 6:50`},
                            ];
        const date = new Date();
        const timeString = date.getHours() + ":" + date.getMinutes();
        for (const time of timeArray){
            //if (time.date === timeString){
                for (const channel of bot.channels.cache){
                    channel.map(c => {
                        if (c && c.type === "text" && c.id == "745374719045271603"){
                            c.send(time.text);
                        }
                    })
                }
            //}
        }
    }, 1000);
    /**
     * Bot added to the server event
     */
    bot.on("guildCreate", guild => {
        telegram.sendToTelegram(bot, `${guild.name} add bot to server.\n ${guild.memberCount} members`);
        bot.user.setActivity(`!help`, {type: 'LISTENING'});

        const Server = new server(guild.id, null, null, "!", null,
            null, null, 2);
        database.addToDataBase(bot, Server);
        const message = new Discord.MessageEmbed()
            .setDescription(`To connect the bot to your server and use private chat function go to web page and configure owned guild:`)
            .setAuthor("🤖 Stepfather Help list",)
            .setColor(0xffd63e)
            .addFields(
                {
                    name: '\u200B', value: "\n" +
                        "Get a list of guild administration help (configure the welcome channel, change the bot prefix for the server, and much more)" +
                        "\n```js\n" + Server.prefix + "manage help```", inline: false
                },
                {name: '\u200B', value: "Send bug report ```" + Server.prefix + "bug <report text>```", inline: true},
                {
                    name: '\u200B',
                    value: "Send suggestions message ```" + Server.prefix + "sug <suggestions message>```",
                    inline: true
                },
                {name: '\u200B', value: "Show a list of commands ```" + Server.prefix + "help```", inline: true},
                {name: '\u200B', value: "Yes or Not ```" + Server.prefix + "yn <question>```", inline: true},
                {name: '\u200B', value: "Get bot info ```" + Server.prefix + "status```", inline: true},
                {name: '\u200B', value: "🐬 Flip a coin ```" + Server.prefix + "flip```", inline: true},
                {name: '\u200B', value: "Private help list ```" + Server.prefix + "connect```", inline: true},
                {name: '\u200B', value: "Delete last n messages ```" + Server.prefix + "purge <n>```", inline: true},
                {
                    name: '\u200B',
                    value: "Get embedded message ```" + Server.prefix + "embed <message content>```",
                    inline: true
                },
                {
                    name: '\u200B',
                    value: "Get user image ```" + Server.prefix + "avatar <@user>``` or ```" + Server.prefix + "avarar <@user> <@user>```",
                    inline: true
                },
                {
                    name: '\u200B',
                    value: "Generates a random number from 0 to the value you entered\n```js\n" + Server.prefix + "random 20``````js\n@author, Value from 0 to 20 - 11```",
                    inline: true
                },
            );

        guild.owner.send(message);

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
            channel.send(embed).catch(err => debug.log(bot, err.message));
        });
    });

    /**
     * Bot removed from the server event
     */
    bot.on("guildDelete", guild => {
        database.removeFromDataBase(guild, guild.id);

        const action = bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
        telegram.sendToTelegram(bot, `${guild.name} remove bot from server.`);

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
            channel.send(embed).catch(err => debug.log(bot, err.message));
        });
    });

    const intervalStatus = setInterval(() => {
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
            bot.user.setActivity(`${count} members`, {type: 'LISTENING'});
        } else if (sq > 50) {
            bot.user.setActivity(`${bot.guilds.cache.size} servers`, {type: 'LISTENING'});
        }

    }, hour / 2);

    /**
     *
     * Member added
     **/
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

}