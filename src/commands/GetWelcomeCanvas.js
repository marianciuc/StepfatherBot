const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const {MessageAttachment} = require('discord.js');
const Database = require('../DataAccessObjects/ServersImplementation');
const Debug = require('../Debug');
const image = require('../../welcome_image.json');
const {registerFont} = require('canvas');

const width = 831;
const height = 407;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');


//Imports fonts
//registerFont(PATH, fontFace);
registerFont('./src/OtherRes/fonts/19572.ttf', {family: 'Lemon'});

module.exports = {
    name: 'welcome',
    description: "Call the bot help menu.",
    visibility: false,

    /**
     * @param message
     * @param bot (Discord bot client)
     * @param url (New image url)
     * @returns {number} (If message author hasPermissions == false)
     */
    changeWelcomeChannelImage(message, bot, url) {

        //Checking for user has permissions
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        //connecting to database and update guild information
        Database.updateGuild(bot, "custom_welcome_image_url", url, message.guild.id);
        message.reply(`Successfully changed welcome image.\n`);
    },

    /**
     * @param message
     * @param id (Welcome channel id)
     * @param bot (Discord bot client)
     * @returns {number}
     */
    changeWelcomeChannel(message, id, bot) {

        //Checking for user has permissions
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You are not administrator");
            return 0;
        }

        //checking for channel available
        if (!message.guild.channels.cache.get(id)) {
            message.channel.send("Channel not founded");
            return 0;
        }

        //connecting to database and update welcome_channel_id information
        Database.updateGuild(bot, "welcome_channel_id", id, message.guild.id);

        message.channel.send(`***New welcome channel name***: ${message.guild.channels.cache.get(id)}`);
    }
}

module.exports.getWelcomeImage = getWelcomeImage;

/**
 * Get welcome image function
 * @param member
 * @param bot (Discord bot client)
 * @param type
 * @returns {Promise<void>}
 */
async function getWelcomeImage(member, bot, type) {

    //Creating server model and getting guild info from database
    const server = await Database.QueryInit(bot, member.guild.id);
    const welcome_channel_id = server.welcome_channel_id;

    //text
    let text;
    let statusText;
    let third;

    if (type === "add") {
        statusText = `WELCOME`;
        text = `${member.user.tag}`;
        third = `to ${member.guild.name}`;
    } else {
        statusText = `GOODBYE`;
        text = `${member.user.tag}`;
    }

    //Checking for custom welcome image
    if (server != null && server.custom_welcome_image_url != null && server.custom_welcome_image_url.endsWith(".png")) {
        await loadImage(`${server.custom_welcome_image_url}`).then(image => {
            context.drawImage(image, 0, 0, width, height);
        });
    } else {
        await loadImage('./src/Images/welcome_images/welcome_image.png').then(image => {
            context.drawImage(image, 0, 0, width, height);
        });
    }

    context.textAlign = 'center';
    context.textBaseline = 'top';

    context.fillStyle = '#fff';

    await loadImage(`${member.user.avatarURL({format: "png"})}`).then(async image => {
        context.drawImage(image, 298, 17, 237, 237);

        //Draw welcome or goodbye
        context.font = '40pt Lemon';

        context.fillText(statusText, 416, 271);

        //Draw other text
        context.font = '20pt Century Gothic';

        context.fillText(text, 416, 332);

        if (third) context.fillText(third, 416, 357);

        //save image
        const buffer = canvas.toBuffer('image/png');
        await fs.writeFileSync(`./src/Images/welcome_images/welcome_image_${member.user.id}.png`, buffer);
    });

    await setTimeout(async () => {
        //init attachment
        const attachment = await new MessageAttachment(`./src/Images/welcome_images/welcome_image_${member.user.id}.png`);

        //searching welcome channel
        bot.channels.fetch(welcome_channel_id).then(async channel => {
            //sending image
            await channel.send(attachment);

            //deleting image from server
            await fs.unlinkSync(`./src/Images/welcome_images/welcome_image_${member.user.id}.png`);
        });
    }, 2000);
}
