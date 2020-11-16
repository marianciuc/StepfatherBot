const Discord = require( `discord.js` );

module.exports = {
    name: "embed",
    description: "💌 Send your message using the Embeded function.",
    visibility: true,
    execute ( message, prefix ) {
        const content = message.content.slice( prefix.length + 5, message.content.length );
        const url = message.attachments.map( attachment => attachment.url );
        let embedElement = new Discord.MessageEmbed()
            .setColor( 0xffd63e )
            .setAuthor( `${message.author.username}`, `${message.author.avatarURL()}` )
            .setDescription( `${content}`, )
            .setImage( `${url.length > 0 ? url[ 0 ] : "https://s7.gifyu.com/images/rainbow9550eeae6fd8fd5f.gif"}` )
            .setTimestamp();
        message.channel.bulkDelete( 1, true ).then( message.channel.send( embedElement ).catch( error => {
            console.log( error )
        } ) ).catch( ( err ) => {
            msg.channel.send( `❌ Error  ${err.message}` );
        } );
    }
}
