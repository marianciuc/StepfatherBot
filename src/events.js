const { Closeness } = require( './entity/index' )
const {Events, ChannelType: {GuildVoice}} = require("discord.js");
const {updateStatsVoiceChannel, closenessStart} = require("./closeness");

module.exports = () => {
    /**
     * Discord client authentication with token.
     */
    bot.login(process.env.DISCORD_TOKEN)
        .then( () =>console.log("Bot successfully logged in"))
        .catch( (e) => console.log(e.message));

    /**
     * Where bot has been started we call for this function.
     *
     * This function:
     * Counting guilds and members, change bot activity, checking for private channels available,
     * if private channel is available, function create interval.
     */
    bot.on( Events.ClientReady, () => {
        for ( const channel of bot.channels.cache ) {
            channel.map( async channel => {
                if (!!channel && channel.type === GuildVoice) {
                    const closeness = await Closeness.findOne({where: {guildId: channel.guild.id}});
                    if (closeness && !!channel.parent && closeness.dataValues.channelParentId === channel.parent.id && channel.id !== closeness.channelRoomId) {
                        updateStatsVoiceChannel(channel);
                    }
                }
            } );
        }
    } );

    /**
     * Message event listener
     */
    bot.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        if (bot.commands.get(interaction.commandName)) {
            bot.commands.get(interaction.commandName).execute(interaction)
        }
    });
}
bot.on( Events.VoiceStateUpdate, async (oldState, newState) => {
    if (!oldState.channel || newState && newState.channel && newState.channel.parent) {
        await closenessStart(newState);
    }
} );
