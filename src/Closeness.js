const debug         = require('../src/Debug');

/**
 *
 * @param bot
 */
module.exports = (bot, database ) => {
    bot.on("voiceStateUpdate", async (oldState, newState) => {
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
                                    clone.setName(clone.name.replace("🔐",  "🔓")).catch(err => debug.log(bot,err.message));
                                } else if (clone.full) {
                                    clone.setName( clone.name.replace("🔓",  "🔐")).catch(err => debug.log(bot,err.message));
                                }
                            }, 5000);
                        })
                        return 0;
                    }
                }
            }
    });
}