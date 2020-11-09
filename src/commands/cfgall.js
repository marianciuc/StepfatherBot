const GuildController = require('../controllers/guild')
const GuildModel = require('../entity/guild')

module.exports = {
    name: "cfgall",
    visibility: false,
    execute() {
        bot.guilds.cache.map(guild => {
            if (!guild) return;
            GuildModel.findOne({guildId: guild.id}, (err, document) => {
                if (err || document) return;
                GuildController.create(guild);
            })
        })
    }
}