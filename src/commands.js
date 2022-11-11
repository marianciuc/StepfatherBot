/**
 * Getting commands from ./src/commands/*.js
 */

const { REST, Routes, Collection} = require('discord.js');

module.exports = ( commandFiles ) => {
    bot.commands = new Collection();

    let commands = [];
    !function () {
        for (const file of commandFiles){
            try {
                const command = require(`../src/commands/${file}`);
                bot.commands.set(command.data.name, command);
                commands.push({name: command.data.name, description: command.data.description})
            } catch (error) {
                console.log(error.message)
            }
        }
    }();

    const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(process.env.DISCORD_ID), {body: commands});
        } catch (error) {
            console.error(error);
        }
    })();
}
