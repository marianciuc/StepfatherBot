const {Schema, model} = require('mongoose');

const GuildSchema = new Schema({
    guildId: String,
    name: String,
    updated: {type: Date, default: Date.now},
    members: {
        count: {type: Number, min: 0},
    },
    closeness: {
        ref: 'closeness',
        type: String,
        default: null
    },
    welcome: {
        ref: 'welcome',
        type: String,
        default: null
    },
    roles: Number,
    iconURL: String,
    prefix: {type: String, default: '!'}
});

module.exports = model('guild', GuildSchema);