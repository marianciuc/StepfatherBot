const { guildEntity } = require( '../entity/index' )
const { closenessController, welcomeController } = require( '../controllers/index' )
const debug = require( '../telegram' )

const remove = ( guildObject ) => {
    guildEntity.findOneAndUpdate( { guildId: guildObject.id }, { status: 'DELETED' }, { upsert: true }, function ( err, doc ) {
        if ( err ) return debug.log( err, __filename );
    } );
    return 0;
}

const create = ( guildObject ) => {
    closenessController.create( guildObject ).then( () => {
        welcomeController.create( guildObject ).then( () => {
            const model = {
                guildId: guildObject.id,
                name: guildObject.name,
                members: {
                    count: guildObject.memberCount || guildObject.members.cache.size,
                },
                roles: guildObject.roles.cache.size,
                iconURL: guildObject.iconURL( { format: "png" } ),
                updated: Date.now()
            };
            guildEntity.findOneAndUpdate( { guildId: guildObject.id }, model, { upsert: true }, function ( err, doc ) {
                if ( err ) return debug.log( err, __filename );
            } );
        } );
    } );
    return 0;
}

module.exports = { create, remove };
