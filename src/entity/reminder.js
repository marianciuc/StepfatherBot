const {Schema, model} = require('mongoose');

const Reminder  = new Schema({
    guildId: String,
    reminders: JSON,
});

module.exports = model('reminder', Reminder);