const {Schema, model} = require('mongoose');

const WelcomeSchema = new Schema({
    guildId: String,
    status: Boolean,
    updated: {type: Date, default: Date.now},
    image: {type: String, default: "https://i.ibb.co/wL9W9dD/example.png"},
    channel: {
        id: {type: String, default: null},
        name: {type: String, default: null},
    }
});

module.exports = model('welcome', WelcomeSchema);