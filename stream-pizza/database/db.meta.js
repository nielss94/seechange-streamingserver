const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    avatar_source: String,
    short_bio: String,
    stream_key: String,
    isLive: Boolean
});

const User = mongoose.model('user', UserSchema);

async function addUser(metadata) {
    console.log("SAVING USER IN DATABASE");

    try {
        metaJSON = JSON.parse(metadata);
        console.log(metaJSON);
        const newUser = new User({
            name: metaJSON.name,
            avatar_source: metaJSON.avatar_source,
            short_bio: metaJSON.short_bio,
            stream_key: metaJSON.stream_key,
            isLive: 1
        });

        await newUser.save();
        console.log("Saved to db!");

    } catch (e) {
        logError(e);
    }
}


async function getLive() {
   return await User.find({ isLive: 1 });
} 

async function setAllUsersOffline() {
    try {
        await User.update({isLive: 0});
        console.log('Removed all users from database');
    } catch (e) {
        logError(e);
    }
}

async function setUserOffline(metadata) {
    try {
        metaJSON = JSON.parse(metadata);
        user = await User.findOneAndUpdate({ stream_key: metaJSON.stream_key });
        console.log('User updating...');
        user.isLive = 0;
        await user.save()
        console.log('User not live')
    } catch (e) {
        logError(e);
    }
}

function logError(error) {
    console.log("ERROR: " + error)
}

module.exports = { addUser, setUserOffline: setUserOffline, getLive, setAllUsersOffline, setUserOffline: setUserOffline }