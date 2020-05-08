module.exports = {
    name: "help-menu",
    descriptiom: "menu",
    execute(msg){
        msg.channel.send({
            "embed": {
              "description": "To connect the bot to your server and use private chat function, follow the [link](google.com) and write: ```c\n!connect```",
              "color": 0xffd63e,
              "timestamp": "2020-05-07T22:42:38.090Z",
              "footer": {
                "text": "footer text"
              },
              "author": {
                "name": "ClosenessBot Help list",
              },
              "fields": [
                {
                  "name": "!help",
                  "value": "Show a list of commands",
                  "inline": true
                },
                {
                  "name": "!rand",
                  "value": "Generates a random number from 0 to the value you entered\n```js\n!random 20``````js\n@author, Value from 0 to 20 - 11```",
                  "inline": true
                },
                {
                  "name": "!Help",
                  "value": "these last two",
                  "inline": true
                },
                {
                  "name": "!Help",
                  "value": "are inline fields",
                  "inline": true
                },
              ]
            }
          });
}}