module.exports = {
    name: "get-server-list",
    execute(message, bot){
        let count = " ";
        for (let guild of bot.guilds.cache) {
            guild.map(guild => {
                if (guild.name) {
                    count =count + "\n"+guild.name + ": " + guild.memberCount+" members";
                }
            });
        }
        message.channel.send(count);
    }
}