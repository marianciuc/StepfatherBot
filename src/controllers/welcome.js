const Model = require('../entity/welcome')
const debug = require('../telegram')
const {registerFont} = require('canvas');
const fs = require('fs');
const {createCanvas, loadImage} = require('canvas');
const {MessageAttachment} = require('discord.js');

const width = 831;
const height = 407;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

registerFont('./src/OtherRes/fonts/19572.ttf', {family: 'Lemon'});

class Welcome {
    get(member, {type}) {
        Model.findOne({guildId: member.guild.id}, (err, document) => {
            if (err) return debug.log(err, __filename);
            if (document && document.channel.id) {
                bot.channels.fetch(document.channel.id).then(channel => {
                    let text, statusText, third;

                    switch (type) {
                        case 'add': {
                            statusText = `WELCOME`;
                            text = `${member.user.tag}`;
                            third = `to ${member.guild.name}`;
                            break;
                        }
                        case 'remove': {
                            statusText = `GOODBYE`;
                            text = `${member.user.tag}`;
                            break;
                        }
                    }
                    loadImage(`${document.image}`).then(image => {
                        context.drawImage(image, 0, 0, width, height);
                        context.textAlign = 'center';
                        context.textBaseline = 'top';
                        context.fillStyle = '#fff';
                        loadImage(`${member.user.avatarURL({format: "png"})}`).then(image => {
                            context.drawImage(image, 298, 17, 237, 237);
                            context.font = '40pt Lemon';
                            context.fillText(statusText, 416, 271);

                            context.font = '20pt Century Gothic';
                            context.fillText(text, 416, 332);

                            if (third) context.fillText(third, 416, 357);

                            const buffer = canvas.toBuffer('image/png');
                            fs.writeFileSync(`./src/Images/welcome_images/welcome_image_${member.guild.id}${member.user.id}.png`, buffer);
                            const attachment = new MessageAttachment(`./src/Images/welcome_images/welcome_image_${member.guild.id}${member.user.id}.png`);
                            channel.send(attachment).then(() => {
                                fs.unlinkSync(`./src/Images/welcome_images/welcome_image_${member.guild.id}${member.user.id}.png`);
                            });
                        });
                    });
                });
            }
        });
    }

    create(guild, channel, url) {
        return new Promise((resolve => {
            const model = {
                guildId: guild.id,
                status: typeof channel !== 'undefined' ? false : true,
                image: url || 'https://i.ibb.co/wL9W9dD/example.png',
                channel: {
                    id: typeof channel !== 'undefined' ? channel.id : null,
                    name: typeof channel !== 'undefined' ? channel.name : null
                },
                updated: Date.now()
            };
            Model.findOneAndUpdate({guildId: guild.id}, model, {upsert: true}, function (err, doc) {
                if (err) return debug.log(err, __dirname + __filename);
            });
            resolve(model);
        }))
    }
}

module.exports = Welcome.prototype;