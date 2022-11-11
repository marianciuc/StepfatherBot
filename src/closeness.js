const { Closeness } = require( './entity/index' );
const { PermissionsBitField} = require("discord.js");

function updateStatsVoiceChannel(channel) {
    const interval = setInterval(() => {
        if (channel.deleted) {
            clearInterval(channel);
            return;
        }
        if (channel.members.size < 1) {
            channel.delete("All users have left the voice channel.").catch(err => console.log(JSON.stringify(err), __filename));
            clearInterval(interval);
            return;
        }
        if (!channel.full) {
            channel.setName(channel.name.replace("🔐", "🔓")).then(() => {
                if (!!channel.name.match(new RegExp("🔓")) === false) {
                    channel.setName(channel.name + ' 🔓').catch(err => console.log(JSON.stringify(err), __filename));
                }
            }).catch(err => console.log(JSON.stringify(err), __filename));
        } else if (channel.full) {
            channel.setName(channel.name.replace("🔓", "🔐")).then(() => {
                if (!!channel.name.match(new RegExp("🔐")) === false) {
                    channel.setName(channel.name + ' 🔐').catch(err => console.log(JSON.stringify(err), __filename));
                }
            }).catch(err => console.log(JSON.stringify(err), __filename));
        }
    }, 5000);
}
async function closenessStart(newState) {
    const closeness = await Closeness.findOne({where: {guildId: newState.channel.guild.id}});

    if (!!closeness && closeness.dataValues.channelParentId === newState.channel.parent.id && closeness.channelRoomId === newState.channel.id) {
            newState.channel.clone({
                name: newState.member.user.username + " 🔓",
                reason: `Creation of a new private channel for ${newState.member.user.username}.`,
                userLimit: 2
            }).then(clone => {
                newState.setChannel(clone, "Moving a user to a private channel.").catch(err => console.log(JSON.stringify(err), __filename));
                clone.permissionOverwrites.set([
                    {
                        id: newState.member.user.id,
                        deny: [PermissionsBitField.Flags.ManageChannels],
                    },
                ], `Authorisation granted to a user ${newState.member.user.id} to control the voice channel.`).catch(err => console.log(JSON.stringify(err), __filename));
                updateStatsVoiceChannel(clone)
            });
        }
}
module.exports = {closenessStart, updateStatsVoiceChannel}
