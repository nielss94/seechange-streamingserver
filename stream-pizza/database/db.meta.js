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
        console.log(metadata);
        metaJSON = JSON.parse(metadata);
        console.log(metaJSON);
        const user = await User.findOne({stream_key: metaJSON.stream_key});
        if (user) {
            user.isLive = 1;
            await user.save();
            console.log("User now live again!");
        } else {
            const newUser = new User({
                name: metaJSON.name,
                avatar_source: metaJSON.avatar_source,
                short_bio: metaJSON.short_bio,
                stream_key: metaJSON.stream_key,
                isLive: 1
            });

            await newUser.save();
            console.log("Saved to db!");
        }


    } catch (e) {
        logError(e);
    }
}


async function getLive() {
    return await User.find({ isLive: 1 });
}

async function setAllUsersOffline() {
    try {
        users = await User.update({}, { isLive: 0 }, {multi: true});
        console.log('Updated all');
    } catch (e) {
        logError(e);
    }
}

async function setUserOffline(stream_key) {
    try {
        user = await User.findOne({ stream_key: stream_key });
        console.log('=======UPDATING THIS BOIII=====');
        console.log(user);
        console.log('User updating...');
        user.isLive = 0;
        console.log(user);
        await user.save();
        console.log('User not live');
    } catch (e) {
        logError(e);
    }
}

async function getUser(stream_key) {
    try {
        return await User.findOne({ stream_key: stream_key });
    } catch (e) {
        logError(e);
    }
}

function logError(error) {
    console.log("ERROR: " + error)
}

module.exports = { addUser, getUser, getLive, setAllUsersOffline, setUserOffline };
