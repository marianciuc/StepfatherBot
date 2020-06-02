const Discord = require("discord.js");
var mysql = require("mysql");
const bot = new Discord.Client();
var fs = require("fs");
const format = require("node.date-time");
const { prefix, token ,DATABASE_PASSWORD, DATABASE_URL, DATABASE_USERNAME, DATABASE_NAME } = require("./config.json");
const package = require("./package.json");
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let date = new Date();
!function() {
  for (let file of commandFiles) {
    try {
      let command = require(`./commands/${file}`);
      bot.commands.set(command.name, command);
      console.log(`Added ${command.name}.`)
    }catch(error)
    {
      console.error(error.message);
    }
  }
  console.log(`Added ${bot.commands.size} files.`)
}();
var connection = mysql.createConnection({
  host: DATABASE_URL,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME
});
bot.login(token);
bot.once("ready", () => {
  log("readme", "["+date.format("Y-M-d H:m:S")+"]"+` ${bot.user.username} has started\n`, true);
  bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
    console.log(link);
  });
  console.log("Bot author: "+ package.author+"\nVersion: "+package.version);
  bot.user.setActivity(` ${bot.guilds.cache.size} servers`, {type: "LISTENING"});
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
      case "purge":
        bot.commands.get('clear-chat').execute(message);
        return 0;
      case "rand":
        bot.commands.get('random').execute(message.content, message);
        return 0;
    }
});
bot.on("voiceStateUpdate",  (oldState, newState) => {
  if (!oldState.channel){
    if (newState.channel.name == bot.user.username || newState.channel.parent.name == bot.user.username){
      if (newState.channel.name == bot.user.username){
        newState.channel.clone({ name: newState.member.user.username+" 🔓", reason: 'Closeness function activated' , userLimit: 2}).then(clone => {
          newState.setChannel(clone, "nujno");
          clone.add
          interval = setInterval(() => {
            let count = 0;
            clone.members.each(user => count++);
            if (count < 1 || !clone) {
              clone.delete("ss").catch(console.error());
              clearInterval(interval);
              return;
            }
          },1000);
        })
        return;
      }
      if (!newState.channel.full){
        newState.channel.setName(newState.member.user.username+" 🔓")
      }
      if (newState.channel.full){
        newState.channel.setName(newState.member.user.username+" 🔐")
      }
  }
  }
  if(oldState.channel && !newState.channel) {
    if (oldState.channel.name!=bot.user.username && oldState.channel.parent.name == bot.user.username){
      oldState.channel.delete("Deleted.").catch(console.error());
      return;
    }
  }
});
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


