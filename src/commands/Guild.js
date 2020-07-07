const Discord = require('discord.js');
const emojiJSON = require('../emoji.json');
const Server = require('../DataAccessObjects/ServersImplementation');

/**
 * get guild information
 * @param bot
 * @param message
 * @returns {Promise<void>}
 */

module.exports.getGuildInfo = getGuildInfo;
async function getGuildInfo(bot, message, status, g){
        const guild = status ? message.guild : g;
        const server = await Server.QueryInit(bot, guild.id);

        let customEmojisString = "";

        guild.emojis.cache.forEach(emoji => {
            customEmojisString = `${customEmojisString} ${emoji.toString()}`
        });

        if (customEmojisString.length > 500){
            customEmojisString = "Too many emojis";
        }

        let rolesString = "";

        guild.roles.cache.forEach(role => {
            if (status){
                rolesString = `${rolesString} ${role.toString()}`
            }
            else {
                rolesString = `${rolesString} @${role.name}`
            }
        })

        rolesString = rolesString.substr(11)
        const roleArgs = rolesString.split( / /,);
        const highestRole = roleArgs[2];

        const owner = guild.owner;
        let admins = 0;
        let bots = 0;
        let members = 0;

        guild.members.cache.forEach(member => {
            if (member){
                members++;
                if (member.user.bot){
                    bots++;
                } else {
                    if (member.hasPermission("ADMINISTRATOR")){
                        admins++;
                    }
                }
            }
        });

        const users = members - bots;
        let privateChannel;
        let privateChannelCategory;
        let welcomeChannel;
        const channels = guild.channels.cache.size;
        let voiceChannels = 0;
        let textChannels = 0;
        let categories = 0;

        guild.channels.cache.forEach(channel => {
            if (channel.type === "text"){
                textChannels++;
            } else if (channel.type === "voice"){
                voiceChannels++;
            } else if (channel.type === "category"){
                categories++;
            }
            if (privateChannel && channel.id === server.private_channel_id){
                privateChannel = channel;
            } else if (welcomeChannel && channel.id === server.welcome_channel_id){
                welcomeChannel = channel;
            } else if (privateChannelCategory && channel.id === server.private_category_id){
                privateChannelCategory = channel;
            }
        })

        const embedElement = await new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .addFields(
                {name: "Owner:", value: `**Tag:** ${owner.user.tag}\n**Id:** ${owner.id}`, inline: true},
                {name: `Region: ${emojiJSON[guild.region]}`, value: `**Guild id:** ${guild.id}\n`, inline: true},
                {name: "Members:", value: `**All members:** ${members}, **Bots:** ${bots}, **Users:** ${users}, **Admins:** ${admins}.`, inline: true},
                {name: "Channels:", value: `**All channels:** ${channels}, **Text channels:** ${textChannels}, **Voice channels:** ${voiceChannels}, **Categories:** ${categories}.`, inline: true},
                {name: `Other:`, value: `**Private room channel:** ${privateChannel ? privateChannel.name : "None"}\n`+
                    `**Private category:** ${privateChannelCategory ? privateChannelCategory.name : "None"}\n`+
                    `**Welcome channel:** ${welcomeChannel ? welcomeChannel.name : "None"}`+
                    `\n**Welcome image:** ${server.custom_welcome_image_url ? server.custom_welcome_image_url : "None"}`, inline: false},
                {name: `Emojis: ${guild.emojis.cache.size}`, value: `**All emojis:**\n${customEmojisString}`, inline: false},
                {name: `Roles: ${roleArgs.length-1}`, value: `**All roles:** ${rolesString}\n**Highest role:** ${highestRole}`, inline: false},
                {name: "Support bot:", value: `\n**[Donate link 1](https://www.donationalerts.com/r/stepfather) [Donate link 2](https://donatebot.io/checkout/700110963176636578)**`, inline: false},
                )
            .setFooter(`${owner.user.username}`, `${owner.user.displayAvatarURL()}`)
            .setTimestamp();
        message.channel.send(embedElement);
    }
    module.exports.getGuildInfoById = async function(bot, id, message){
        let guild;
        bot.guilds.cache.forEach(g => {
            if (g.id === id) {
                guild = g;
                return;
            }
        });
        await getGuildInfo(bot, message, false, guild);
    }
