const Discord = require('discord.js');
const image = require('../../welcome_image.json');
const {MessageAttachment} = require('discord.js');

module.exports = {
    name: "help-menu",
    description: "menu",
    getMainHelp(message, prefix) {
        const embed = new Discord.MessageEmbed()
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
        message.channel.send(embed);
    },
    getPrivateHelp(message, prefix) {
        const embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor("❤ Сloseness function.")
            .setDescription(`[Connect](https://discordapp.com/api/oauth2/authorize?client_id=700113613825769522&permissions=8&scope=bot) bot to your server.`)
            .addFields(
                {
                    name: '\u200B',
                    value: 'Add or replace current private channel' +
                        '```js\n'+prefix+'private add <id category> <id channel>```'
                }, {
                    name: '\u200B',
                    value: 'Change user limit```js\n'+prefix+'private limit <new user limit>```' },
            )
            .setImage("https://s7.gifyu.com/images/Record_2020_06_02_13_24_25_654.gif")
            .setTimestamp();
        message.channel.send(embed);
    },
    getManageHelp(message, prefix) {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }


        const embed = new Discord.MessageEmbed()
            .setColor("0xffd63e")
            .setAuthor("🤖 Manege help list")
            .setDescription(`[Connect](https://discordapp.com/api/oauth2/authorize?client_id=700113613825769522&permissions=8&scope=bot) bot to your server.`)
            .addFields(
                {
                    name: '\u200B', value: 'Set or change welcome channel' +
                        '```js\n' + prefix + 'manage welcome <id channel>```'
                },
                {
                    name: '\u200B',
                    value: 'Change user limit```js\n' + prefix + 'private limit <new user limit>```'
                },
            )
            .setImage("https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif")
            .setTimestamp();
        message.channel.send(embed);
    },
    async getWelcomeList(message){

console.log(image)
        let i = 1;

        for (const url in image) {
            const attachment = new MessageAttachment(image[i]);
            await message.channel.send(attachment);
            await message.channel.send(`Use this link to add image to server: ${image[i]}`);
            i++;
        }

        const attachment = new MessageAttachment('./src/OtherRes/example.psd');
       await message.reply(`Use \`manage welcome image <image url>\` to change welcome image.\n`
            +`To create a new image, download the layout and create your image using it`);
        await message.reply(attachment);
     }
}
