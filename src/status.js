const infiniteStatus = setInterval( () => {
    const temp = Math.floor( Math.random() * 100 );
    if ( temp < 50 ) {
        let count = 0;
        for ( const guild of bot.guilds.cache ) {
            guild.map( guild => {
                count += guild.memberCount || 0;
            } );
        }
        bot.user.setActivity( `${count} members`, { type: 'LISTENING' } ).catch( error => debug.log( error, __filename ) );
    } else {
        bot.user.setActivity( `${bot.guilds.cache.size} servers`, { type: 'LISTENING' } ).catch( error => debug.log( error, __filename ) );
    }

}, 1000 * 60 * 60 );
