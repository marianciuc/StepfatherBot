const { closeness } = require( './entity/index' );
const debug = require( './telegram' )

module.exports = () => {
    bot.on( "voiceStateUpdate", ( oldState, newState ) => {
        if ( !oldState.channel || newState && newState.channel ) {
            closeness.findOne( { guildId: newState.channel.guild.id }, ( err, closeness ) => {
                if ( err ) return debug.log( err, __filename );
                if ( !!closeness && !!closeness.guildId && newState.channel.parent.id && closeness.channel.parent.id == newState.channel.parent.id ) {
                    if ( closeness.channel.room.id === newState.channel.id ) {
                        newState.channel.clone( {
                            name: newState.member.user.username + " 🔓",
                            reason: 'Creation of a new private channel.',
                            userLimit: 2
                        } ).then( clone => {
                            newState.setChannel( clone, "Moving a user to a private channel." ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                            clone.overwritePermissions( [
                                {
                                    id: newState.member.user.id,
                                    allow: [ 'MANAGE_CHANNELS' ],
                                },
                            ], 'Create rights for channel management.' ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                            let interval = setInterval( () => {
                                if ( clone.deleted ) {
                                    clearInterval( interval );
                                    return;
                                }
                                if ( clone.members.size < 1 ) {
                                    clone.delete( "All users have left the voice channel." ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                                    clearInterval( interval );
                                    return;
                                }
                                if ( !clone.full ) {
                                    clone.setName( clone.name.replace( "🔐", "🔓" ) ).then( () => {
                                        if ( !!clone.name.match( new RegExp( "🔓" ) ) === false ) {
                                            clone.setName( clone.name + ' 🔓' ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                                        }
                                    } ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                                } else if ( clone.full ) {
                                    clone.setName( clone.name.replace( "🔓", "🔐" ) ).then( () => {
                                        if ( !!clone.name.match( new RegExp( "🔐" ) ) === false ) {
                                            clone.setName( clone.name + ' 🔐' ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                                        }
                                    } ).catch( err => debug.log( JSON.stringify( err ), __filename ) );
                                }
                            }, 5000 );
                        } )
                    }
                }
            } );

        }
    } );
}
