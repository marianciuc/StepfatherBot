const Model = require('../entity/closeness')
const debug = require('../telegram')

class Closeness {
    create(guild) {
       return Model.findOne({guildId: guild.id}, (err, closeness) => {
            if (err) debug.log(err, __filename)
            if (!!closeness) {
                bot.channels.fetch(closeness.channel.parent.id).then((channel) => {
                    if (channel.deleted) return
                    channel.delete()
                });
                bot.channels.fetch(closeness.channel.room.id).then((channel) => {
                    if (channel.deleted) return
                    channel.delete()
                });
            }
        }).then(() => {
            return guild.channels.create("💕 Stepfather bot", {
                type: 'category',
                reason: 'Needed a cool new channel'
            }).then(channel => {
                return guild.channels.create("🌺 Main", {
                    type: 'voice',
                    reason: 'Needed a cool new channel',
                    parent: channel
                }, (err) => {
                    guild.owner.send('Error creating, bot not have permissions.').catch(err => {
                        debug.log(JSON.stringify(err), __filename);
                    });
                }).then(voiceChannel => {
                    const model = {
                        guildId: guild.id,
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
                    Model.findOneAndUpdate({guildId: guild.id}, model, {upsert: true}, function (err, doc) {
                        if (err) return debug.log(err, __filename);
                    });
                }).catch(err => debug.log(err, __filename));
            });
        });
    }
}

module.exports = Closeness.prototype;