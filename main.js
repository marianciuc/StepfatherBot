const Discord = require('discord.js');
const bot = new Discord.Client();
const {
    prefix,
    token,
}=require('./config.json');
bot.login(token);
bot.once("ready", () => {
    console.log(`bot start ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    });
});
bot.on('message', async message => {
  console.log("Chat log: "+message.content);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix))return;
  if (message.content === prefix+'help') {
  message.channel.send({embed: {
    color: 0xFFD63E,
    author:{
        name: bot.user.username+" Help list",
        icon_url: bot.user.avatarURL
  },
  fields:[{
      name: "**__!HELP__**",
      value: "Show list with bot commands"
    },
    {
        name:"Donate",
        value: "Don`t forget support us [Donate link](http://google.com)."
    }
]}})}
});

async function con(mem){
    if(mem.voice.channel){
        const connection = await mem.voice.channel.join();
    }else {
        system.log("sry");
    }
}