const Discord = require("discord.js");
const bot = new Discord.Client();
var fs = require("fs");
const format = require("node.date-time");
const { prefix, token,adminPref } = require("./config.json");
const package = require("./package.json");
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var date = new Date();
for (let file of commandFiles) {
	let command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.login(token);
bot.once("ready", () => {
  log("readme", "["+date.format("Y-M-d H:m:s")+"]"+` ${bot.user.username} has started\n`, true);
  bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
    console.log(link);
  });
  console.log("Bot author: "+ package.author+"\nVersion: "+package.version);
  bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on("message", async (message) => {
  log("readme", "Chat log "+"["+date.format("Y-M-d H:m:S")+"]" +"["+message.guild.name+"]"+" [" +message.author.username +"]: " +message.content+"\n",true);
  if (!message.guild && message.author.bot && !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
      case "help":
        bot.commands.get('help-menu').execute(message);
        return 0;
      case "join":
        joinToChannel(message.member, message);
        return 0;
      case "purge":
        bot.commands.get('clear-chat').execute(message);
        return 0;
      case "rand":
        bot.commands.get('random').execute(message.content, message);
        return 0;
    }
});
async function joinToChannel(autor, msg){
  if (autor.voice.channel){
    const connection = await autor.voice.channel.join();
  }else {
    msg.reply("You need to join a voice channel first!");
  }
}
function log(LogNameFile,loggedMessage,boolean){
  fs.appendFileSync('./logger/'+LogNameFile+'.log', loggedMessage);
  if (boolean){console.log(loggedMessage)};
}
bot.on("guildCreate", guild => {
  log(GuildAdd&Remove, `New guild joined: ${guild.name}[id_${guild.id}]. This guild has ${guild.memberCount} members`, true);
  bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});
bot.on("guildDelete", guild => {
  log(GuildAdd&Remove, `I have been removed from: ${guild.name}[id_${guild.id}].`, true);
  bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});