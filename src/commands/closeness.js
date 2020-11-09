const Model = require('../entity/closeness')

module.exports = {
    name: "private",
    description: "👨‍👧 Create a new private room (For administrators only)",
    visibility: true,
    execute(message) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Sorry, but you are not an administrator of this guild, so you can't change the prefix.");
            return 0;
        }
        Model.findOne({guildId: message.guild.id}, (err, closeness) => {
            if (err) debug.log(err, __filename)
            if (!!closeness){
                bot.channels.fetch(closeness.channel.parent.id).then((channel) => {
                    if (channel.deleted) return
                    channel.delete()
                });
                bot.channels.fetch(closeness.channel.room.id).then((channel) => {
                    if (channel.deleted) return
                    channel.delete()
                });
            }
        }).then(()=>{
            message.guild.channels.create("💕 Stepfather bot", {
                type: 'category',
                reason: 'Needed a cool new channel'
            }).then(channel => {
                return message.guild.channels.create("🌺 Main", {
                    type: 'voice',
                    reason: 'Needed a cool new channel',
                    parent: channel
                }, (err) => {
                    message.guild.owner.send('Error creating, bot not have permissions.').catch(err => {
                        debug.log(JSON.stringify(err), __filename);
                    });
                }).then(voiceChannel => {
                    const model = {
                        guildId: message.guild.id,
                        channel: {
                            parent: {
                                id: channel.id,
                                name: channel.name,
                            },
                            room: {
                                id: voiceChannel.id,
                                name: voiceChannel.name,
                            }
                        },
                        updated: Date.now()
                    };
                    Model.findOneAndUpdate({guildId: message.guild.id}, model, {upsert:true}, function(err, doc){
                        if (err) return debug.log(err, __filename);
                    });
                }).catch(err => debug.log(err, __filename));
            });
        })
    }
}