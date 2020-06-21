const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');

const width = 600;
const height = 200;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');


module.exports.getWelcomeImage = getWelcomeImage;

function getWelcomeImage(message){
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);

        context.textAlign = 'center';
        context.textBaseline = 'top';
        const text = `WELCOME\n${message.author.username}\nTo ${message.guild.name}`;

        context.fillStyle = '#fff';
        context.font = '20px Impact';
        context.fillText(text, 300, 50);
        loadImage(`${message.author.avatarURL({format: "png"})}`).then(image => {
            context.drawImage(image, 100, 50, 70, 70);
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync('./src/Images/welcome_image.png', buffer);
        });
        setTimeout(()=>{
            const attachment = new MessageAttachment('./src/Images/welcome_image.png');
            message.channel.send(attachment);
        }, 1000);
    }
