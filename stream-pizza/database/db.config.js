const mongoose = require('mongoose');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://server:server123@ds161700.mlab.com:61700/seechangemeta');
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + 'mongodb://server:server123@ds161700.mlab.com:61700/seechangemeta'))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;