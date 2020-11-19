const { connect, connection, set } = require('mongoose');
const debug = require('../telegram')
const { mongodb } = require('./app')


connect(`mongodb+srv://${mongodb.username}:${mongodb.password}@${mongodb.database}.jgdli.mongodb.net/Stepfather?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
set('useFindAndModify', false);
connection.on('error', err => {
    console.log(typeof err);
    debug.log(JSON.stringify(err), __dirname);
});
connection.on('connected', () => {
    debug.log(`Connected to database`, __dirname);
});
