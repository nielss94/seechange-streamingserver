const mongoose =  require('mongoose');
const userData = require('./db.meta');

const SatoshiSchema = new mongoose.Schema({
    stream_key: String,
    timeStamp: Date,
    amount: Number
});

// Middleware for adding satoshi to userdata:
SatoshiSchema.post('save', function(next) {
   const satoshi = this;

   userData.findOne({ 'stream_key' : satoshi.stream_key })
       .then((userdata) => {
           userdata.satoshi += satoshi.amount;
           userData.findOneAndUpdate({ 'stream_key': satoshi.stream_key }, userdata)
               .then((userdata) => {
                   console.log(userdata);
               }).catch((error) => {
                   console.log(error);
            });
       }).catch((error) => {
            console.log(error);
    });
});

const Satoshi = mongoose.model('satoshi', SatoshiSchema);

module.exports = Satoshi;