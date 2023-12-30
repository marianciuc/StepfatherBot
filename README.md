<div align="center">
    </a>
    <a href="https://ibb.co/CmSvZpp"><img src="https://i.ibb.co/CmSvZpp/luca-boni-bimbo.jpg" alt="luca-boni-bimbo" border="0"></a>
    <h1>Stepfather bot</h1>
    <h4>A multipurpose Discord bot built with <a href="https://discord.js.org/#/" target="_blank">discord.js</a>.<br><br>
    <img src="https://www.codefactor.io/repository/github/hesowam/stepfatherbot/badge/master?s=bc6f6de950d55fc33d18c69b917a90a4ef72be86">
    </h4>
</div>

# 🤖 About stepfather bot
StepfatherBot is a versatile Discord bot designed to enhance the functionality of Discord servers. It is built using NodeJS, Discord.js, and MongoDB, focusing on creating private rooms and offering a range of other useful commands.

## Features
- **Private Rooms**: Administrators can create private rooms for specific users or groups.
- **User Interaction**: Commands like `flip`, `yn`, and `rand` add interactive elements to the chat.
- **Information and Help**: Users can access bot status, news updates, and a help menu.
- **Customization**: Change bot prefixes and manage chat with commands like `purge`.
- **Feedback and Reports**: Users can report bugs or send suggestions directly through the bot.

Some basic bot commands are:
<div align="center">
<table>
  <tr>
    <td>Command</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>bug</td>
    <td>🐛 Send your report about the bug to us in a discord and telegram.</td>
  </tr>
    <tr>
    <td>private</td>
    <td>👨‍👧 Create a new private room (For administrators only).</td>
  </tr>
    <tr>
    <td>flip</td>
    <td>🐬 Flip a coin. Get eagle or tails.  </td>
  </tr>
    <tr>
    <td>yn</td>
    <td>🙋 Get the answer to the question, yes or no.</td>
  </tr>
    <tr>
    <td>embed</td>
    <td>💌 Send your message using the Embeded function.</td>
  </tr>
    <tr>
    <td>help</td>
    <td>ℹ️ Call the bot help menu.</td>
  </tr>
    <tr>
    <td>avatar</td>
    <td>📌 Get an image of one or more users who were mentioned when calling the method.</td>
  </tr>
    <tr>
    <td>status</td>
    <td>🚥 Get detailed information about the bot.</td>
  </tr>
    <tr>
    <td>news</td>
    <td>🆕 Call up a menu with the latest news about the bot update.</td>
  </tr>
    <tr>
    <td>prefix</td>
    <td> 📲 Change the prefix to call the bot.</td>
  </tr>
    <tr>
    <td>purge</td>
    <td>🍓 Removes chat messages with a maximum limit of one hundred emails and a maximum of two weeks.</td>
  </tr>
    <tr>
    <td>rand</td>
    <td>🦮 The function of generating pseudo-random numbers from zero to 9-digit numbers.</td>
  </tr>
    <tr>
    <td>sug</td>
    <td>✨ Send your idea to us in a discord and telegram.</td>
  </tr>
</table>
</div>

## ✨ Installation
1. Clone the repository:
   
   ```bash
   git clone https://github.com/hesowam/StepfatherBot
   cd StepfatherBot
   ```
2. Install dependencies and run the bot:

    ```bash
    apt-get install npm
    npm install pm2@latest -g
    npm install
    pm2 start pm2-config.json
    ```
   
## 💡 Configuration
Configure the .env file with your Discord and Telegram tokens, database credentials, etc.

```dotenv
DISCORD_TOKEN = ""
DB_USERNAME = ""
DB_PASSWORD = ""
DB_NAME = ""
DB_HOST = ""
DB_DIALECT = ""
TELEGRAM_TOKEN = ""
DISCORD_ID = ""
```

## 💊 Usage
After installation and configuration, the bot can be used in your Discord server. Use the help command to get started with the bot's functionalities.

## ⚖️ License
This project is licensed under the MIT License - see the LICENSE file for details.
