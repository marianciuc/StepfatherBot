const {Schema, model} = require('mongoose');

const GuildSchema = new Schema({
    guildId: String,
    name: String,
    updated: {type: Date, default: Date.now},
    members: {
        count: {type: Number, min: 0},
    },
    roles: Number,
    iconURL: String,
    prefix: {type: String, default: '!'},
    status: {
        type: String,
        enum : ['NEW', 'DELETED'],
        default: 'NEW'
    },
});

module.exports = model('guild', GuildSchema);
