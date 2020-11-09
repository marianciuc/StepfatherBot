const Model         = require('../entity/guild')
const closeness     = require('../controllers/closeness')
const debug         = require('../telegram')
const welcome       = require('../controllers/welcome')

class Guild {
    create(guild) {
        closeness.create(guild).then(() => {
            welcome.create(guild).then(() => {
                const model = {
                    guildId: guild.id,
                    name: guild.name,
                    members: {
                        count: guild.memberCount || guild.members.cache.size,
                    },
                    closeness: guild.id,
                    roles: guild.roles.cache.size,
                    iconURL: guild.iconURL({format: "png"}),
                    updated: Date.now()
                };
                Model.findOneAndUpdate({guildId: guild.id}, model, {upsert:true}, function(err, doc){
                    if (err) return debug.log(err, __filename);
                });
            });
        })
    }
}

module.exports = Guild.prototype;