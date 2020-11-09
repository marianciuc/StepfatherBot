const {Schema, model} = require('mongoose')

const News = new Schema({
    changes: [{
        title: String,
        description: String,
    }],
    updatedAt: {type: Date, default: Date.now()},
    title: String,
    pictureURL: String,
    iconURL: String
});

module.exports = model('news', News);