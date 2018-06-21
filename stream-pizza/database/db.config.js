let env = {
    dbHost: '188.166.127.54',
    dbPort: '27017',
    dbUser: 'admin',
    dbPassword: 'password',
    dbDatabase: 'seechangemeta',
    PORT: '22',
    serverURL: '188.166.127.54'
};

let dburl = 'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase + '?:authMechanism=SCRAM-SHA-1&authSource=admin';


const mongoose = require('mongoose');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.connect(dburl);
// mongoose.connect('mongodb://server:server123@ds161700.mlab.com:61700/seechangemeta');
var connection = mongoose.connection
    .once('open', (s) => console.log('Connected to Mongo on ' + dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;