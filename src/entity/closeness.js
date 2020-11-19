const {Schema, model} = require('mongoose');

const ClosenessSchema = new Schema({
    guildId: String,
    updated: { type: Date, default: Date.now },
    channel: {
        parent: {
            id: {type: String, default: undefined},
            name: {type: String, default: undefined},
        },
        room: {
            id: {type: String, default: undefined},
            name: {type: String, default: undefined},
        }
    }
});

module.exports = model('closeness', ClosenessSchema);
