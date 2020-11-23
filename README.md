<div align="center">
    </a>
    <a href="https://ibb.co/CmSvZpp"><img src="https://i.ibb.co/CmSvZpp/luca-boni-bimbo.jpg" alt="luca-boni-bimbo" border="0"></a>
    <h1>Stepfather bot</h1>
    <h4>A multipurpose Discord bot built with <a href="https://discord.js.org/#/" target="_blank">discord.js</a>.<br><br>
    <img src="https://www.codefactor.io/repository/github/hesowam/stepfatherbot/badge/master?s=bc6f6de950d55fc33d18c69b917a90a4ef72be86">
    </h4>
</div>

## 🤖 About stepfather bot
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
To install, enter the following commands into the terminal
```bash
sudo git clone https://github.com/hesowam/StepfatherBot
cd StepfatherBot
sudo apt-get install npm
sudo npm install pm2@latest -g
sudo npm install
sudo pm2 start pm2-config.json
```
If the repository is private
```bash
sudo git clone https://<USERNAME>@github.com/hesowam/StepfatherBot
cd StepfatherBot
sudo apt-get install npm
sudo npm install pm2@latest -g
sudo npm install
sudo pm2 start pm2-config.json
```
The path to the configuration file:  `StepfatherBot/src/properties/app.js`. 
You need to mark here the key to the bot's telegrams, the channel to which important messages need to be sent, the bot's discord key and the login with the password to the database.
```javascript
port: env.port || 5000,
    mongodb: {
        username: env.mongodb_username
        password: env.mongodb_password
        database: 'stepfatherbot'
    },
    telegram: {
        token: env.telegram_token
    },
    discord: {
        token: env.discord_token
    }
```
