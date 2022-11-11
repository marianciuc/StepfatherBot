const {Closeness} = require('../entity/index')
const {ChannelType: {GuildCategory, GuildVoice}, SlashCommandBuilder, PermissionFlagsBits: {Administrator}} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("configure")
        .setDescription("‍👧 Create a new private room (For administrators only")
        .setDefaultMemberPermissions(Administrator),
    async execute(interaction) {
        const query = { where: { guildId: interaction.guild.id }}
        const closeness = await Closeness.findAll(query);

        if (closeness.length !== 0) {
            for (const doc of closeness) {
                interaction.guild.channels.fetch(doc.dataValues.channelParentId).then(channel => {
                    if (channel) channel.delete();
                }).catch(err => console.error(err))
                interaction.guild.channels.fetch(doc.dataValues.channelRoomId).then(channel => {
                    if (channel) channel.delete();
                }).catch(err => console.error(err))
            }
            await Closeness.destroy(query);
        }
        createCloseness(interaction);
    }
}

function createCloseness(interaction) {
    interaction.guild.channels.create({
        name: `💕 ${bot.user.username}`,
        type: GuildCategory,
        reason: 'Creating a category for private channels'
    }).then(category => {
        return interaction.guild.channels.create({
            name: "🌺 Main",
            type: GuildVoice,
            reason: 'Creating a voice channel for private channels',
            parent: category
        }).then(async voice => {
            await Closeness.create({
                guildId: interaction.guild.id,
                channelParentId: category.id,
                channelRoomId: voice.id
            })
            interaction.reply({content: "Configuration of voice channels successfully completed", ephemeral: true});
        })
    }).catch(function (err) {
        console.error(err)
        interaction.reply(`An error occurred in the configuration of the private channels, please check the access rights of the bot or email the developers ${process.env.MAIL}`);
    })
}
