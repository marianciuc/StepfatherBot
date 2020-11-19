const debug = require( './telegram' );
const { welcomeController, guildController } = require( './controllers/index' )
const { closenessEntity, guildEntity } = require( './entity/index' )
const { discord } = require( './config/app' );

module.exports = ( Discord, commandFiles ) => {
    /**
     * Getting commands from ./src/commands/*.js
     * @type {module:"discord.js".Collection<K, V>}
     */
    bot.commands = new Discord.Collection();
    !function () {
        for ( const file of commandFiles ) {
            try {
                const command = require( `../src/commands/${file}` );
                bot.commands.set( command.name, command );
                console.log( `Added ${command.name}, ${command.description}` )
            } catch ( error ) {
                console.error( error.message );
            }
        }
        console.log( `Successfully uploaded ${bot.commands.size} files.` )
    }();

    /**
     * Discord client authentication with token.
     */
    bot.login( process.env.DISCORD_TOKEN || discord.token ).then( () => {
        console.log( `Login successful\nName: ${bot.user.username}` )
    } ).catch( err => {
        debug.log( err )
    } );

    /**
     * Where bot has been started we call for this function.
     *
     * This function:
     * Counting guilds and members, change bot activity, checking for private channels available,
     * if private channel is available, function create interval.
     */
    bot.once( "ready", () => {
        let count = 0;
        for ( const guild of bot.guilds.cache ) {
            guild.map( guild => count += guild.memberCount || 0 );
        }
        bot.user.setActivity( `${count} members`, { type: 'LISTENING' } ).catch( error => debug.log( error, __filename ) );
        for ( const channel of bot.channels.cache ) {
            channel.map( channel => {
                if ( !channel.deleted && channel.type === "voice" ) {
                    closenessEntity.findOne( { guildId: channel.guild.id }, ( err, closeness ) => {
                        if ( err ) return debug.log( err, __filename );
                        if ( !!closeness && !!channel.parent && closeness.channel.parent.id === channel.parent.id && channel.id !== closeness.channel.room.id ) {
                            if ( channel.members.size < 1 ) {
                                channel.delete( "All users have left the voice channel." ).catch( err => debug.log( err.message, __filename ) );
                            } else {
                                const delInt = setInterval( () => {
                                    if ( channel.deleted ) {
                                        clearInterval( delInt );
                                        return 0;
                                    }
                                    if ( channel.members.size < 1 ) {
                                        channel.delete( "All users have left the voice channel." ).catch( err => debug.log( err.message, __filename ) );
                                        clearInterval( delInt );
                                        return 0;
                                    }
                                }, 2000 );
                            }
                        }
                    } )
                }
            } );
        }
        debug.log( `The ${bot.user.username} was successfully launched`, __filename );
    } );

    /**
     * Message event listener
     */
    bot.on( "message", ( message ) => {
        if ( !message.guild && !message.author.bot ) {
            const privateMessage = new Discord.MessageEmbed()
                .setAuthor( bot.user.username )
                .setDescription( "To use the bot, just write `!Help` to the chat of your guild.\n" +
                    "Join our guild [here](https://discord.gg/mUnUzWt).\n" +
                    "To connect the bot to your guild, follow the [link](https://discordapp.com/oauth2/authorize?client_id=700113613825769522&scope=bot&permissions=2146958839)" )
                .setColor( 0xffd63e )
                .setImage( "https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif" )
                .setTimestamp();
            message.author.send( privateMessage ).catch( err => debug.log( err, __filename ) );
            return 0;
        } else if ( message.author.bot ) return;

        guildEntity.findOne( { guildId: message.guild.id }, ( err, guild ) => {
            if ( err ) return debug.log( JSON.stringify( err ), __filename );
            if ( !guild && message.content.startsWith( '!' ) ) {
                bot.commands.get( 'configure' ).execute( message, bot );
                message.reply( 'Not nice! Most likely now you have a re-created private channel. We apologize for the inconvenience, but for some reason your guild was not in the database! Do not worry, your next command will be successfully processed!' ).catch( err => debug.log( err, __filename ) );
            }
            if ( !message.content.startsWith( guild ? guild.prefix : '!' ) ) return;
            const args = message.content.toLowerCase().slice( guild ? guild.prefix.length : 1 ).split( / +/ );
            const command = args.shift();

            if ( bot.commands.get( command ) ) {
                bot.commands.get( command ).execute( message, guild ? guild.prefix : '!', args )
            }
        } );
    } );

    bot.on( "guildCreate", guild => {
        debug.log( `${guild.name} Guild has added a bot to its server.\n In the guild ${guild.memberCount} members.`, __filename );
        guildController.create( guild );
        bot.user.setActivity( `!help`, { type: 'LISTENING' } ).catch( error => debug.log( error, __filename ) );
    } );

    bot.on( "guildDelete", guild => {
        bot.user.setActivity( `${bot.guilds.cache.size} servers`, { type: 'LISTENING' } ).catch( error => debug.log( error, __filename ) );
        guildController.remove( guild );
        debug.log( `The ${guild.name} Guild excluded the bot from the guild.`, __filename );
    } );

    bot.on( 'guildMemberAdd', member => {
        welcomeController.get( member, { type: 'add' } );
    } );

    bot.on( "guildMemberRemove", member => {
        welcomeController.get( member, { type: 'remove' } );
    } );

}
