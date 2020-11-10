const {connect, connection, set} = require('mongoose');
const debug = require('../telegram')


connect(`mongodb+srv://steproot:Vovik1596@stepfatherbot.jgdli.mongodb.net/Stepfather?retryWrites=true&w=majority`, {
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