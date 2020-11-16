const { closenessEntity } = require( '../entity/index' )
const debug = require( '../telegram' )

const create = ( guildObject ) => {
    return closenessEntity.findOne( { guildId: guildObject.id }, ( err, closeness ) => {
        if ( err ) debug.log( err, __filename )
        if ( !!closeness ) {
            bot.channels.fetch( closeness.channel.parent.id ).then( ( channel ) => {
                if ( channel.deleted ) return
                channel.delete().catch( err => debug.log( err, __filename ) );
            } );
            bot.channels.fetch( closeness.channel.room.id ).then( ( channel ) => {
                if ( channel.deleted ) return
                channel.delete().catch( err => debug.log( err, __filename ) );
            } );
        }
    } ).then( () => {
        return guildObject.channels.create( "💕 Stepfather bot", {
            type: 'category',
            reason: 'Needed a cool new channel'
        } ).then( channel => {
            return guildObject.channels.create( "🌺 Main", {
                type: 'voice',
                reason: 'Needed a cool new channel',
                parent: channel
            } ).then( voiceChannel => {
                const model = {
                    guildId: guildObject.id,
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
                closenessEntity.findOneAndUpdate( { guildId: guildObject.id }, model, { upsert: true }, function ( err, doc ) {
                    if ( err ) return debug.log( err, __filename );
                } );
            } ).catch( err => debug.log( err, __filename ) );
        } ).catch( err => debug.log( err, __filename ) );
    } ).catch( err => debug.log( err, __filename ) );
}

module.exports = { create };
