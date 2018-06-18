const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    avatar_source: String,
    short_bio: String,
    stream_key: String
});

const User = mongoose.model('user', UserSchema);

function addUser(metadata) {
    console.log("SAVING USER IN DATABASE");

    try {
        metaJSON = JSON.parse(metadata);
        console.log(metaJSON);
        const newUser = new User({
            name: metaJSON.name,
            avatar_source: metaJSON.avatar_source,
            short_bio: metaJSON.short_bio,
            stream_key: metaJSON.stream_key
        }).save()
          .then(newUser => {
              console.log("Saved to db!");
          }).catch(err => {
              console.log(err);
        });

    } catch (error) {
        console.log("ERROR: " + error)
    }
}

function removeUser(metadata) {

    console.log("REMOVING USER IN DATABASE");
    metaJSON = JSON.parse(metadata);

    User.findOne({ stream_key: metaJSON.stream_key })
        .remove()
        .then(User => {
            console.log('Removed from database');
        }).catch(err => {
            console.log(err);
    });
}

async function getLive() {
   return await User.find();
} 

function removeAllUsers() {
    User.remove({})
        .then(User => {
            console.log('Removed all users from database');
        }).catch(err => {
            console.log(err);
    });
}

module.exports = { addUser, removeUser, getLive, removeAllUsers }