const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const {MessageAttachment} = require('discord.js');
const Database = require('../DataAccessObjects/ServersImplementation');
const Debug = require('../Debug');
const image = require('../../welcome_image.json');

const width = 1200;
const height = 600;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

module.exports = {
    name: 'welcome',
    changeWelcomeChannelImage(message, bot, url){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        Database.updateGuild(bot, "custom_welcome_image_url", url, message.guild.id);
        message.reply(`Successfully changed welcome image.\n`);
    },
    async changeWelcomeImage(message, args, bot){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        if (args.length < 2) return;
        if (!message.guild.channels.cache.get(args[1])){
            message.channel.send("Channel not founded");
            return 0;
        }

        database.updateGuild(bot, "welcome_channel_id", args[1], message.guild.id);

        message.channel.send(`***New welcome channel name***: ${message.guild.channels.cache.get(args[1])}`);
    }
}

module.exports.getWelcomeImage = getWelcomeImage;

async function getWelcomeImage(member, bot, type) {
    const server = await Database.QueryInit(bot, member.guild.id);
    const welcome_channel_id = server.welcome_channel_id;

    let text;

    if (type === "add"){
        text = `Welcome to ${member.guild.name}\n${member.user.tag}`;
    } else {
        text = `${member.user.tag}\nHas been removed from ${member.guild.name}`;
    }

    if (server != null && server.custom_welcome_image_url != null && server.custom_welcome_image_url.endsWith(".png")) {
        await loadImage(`${server.custom_welcome_image_url}`).then(image => {
            context.drawImage(image, 0, 0, 1200, 600);
        });
    } else {
        await loadImage('./src/Images/welcome_images/welcome_image-1.png').then(image => {
            context.drawImage(image, 0, 0, 1200, 600);
        });
    }

    context.textAlign = 'center';
    context.textBaseline = 'top';

    context.fillStyle = '#fff';
    context.font = '30pt Roboto';

    await loadImage(`${member.user.avatarURL({format: "png"})}`).then(image => {
        context.drawImage(image, 83, 126, 340, 340);
        context.fillText(text, 750, 240, 1100);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./src/Images/welcome_images/welcome_image.png', buffer);
    });

    await setTimeout(async () => {
        const attachment = await new MessageAttachment('./src/Images/welcome_images/welcome_image.png');
        bot.channels.fetch(welcome_channel_id).then(async channel => {
            console.log(channel);
            channel.send(attachment);
        });
    }, 1000);
}
