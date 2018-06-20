const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    stream_key: String,
    startTime: Date,
    endTime: Date
});

const Log = mongoose.model('log', LogSchema);

async function onlineLog(metaData) {
  try {
        metaJSON = JSON.parse(metadata);
        console.log(metaJSON);
        const newLog = new Log({
            stream_key: metaJSON.stream_key,
            startTime: new Date()
        });
        await newLog.save();
    } catch (e) {
        logError(e);
    }  
}

async function offlineLog(metaData) {
    try {
        metaJSON = JSON.parse(metadata);
        console.log(metaJSON);
        const newLog = new Log({
            stream_key: metaJSON.stream_key,
            endTime: new Date()
        });
        await newLog.save();
    } catch (e) {
        logError(e);
    }  
}

function logError(error) {
    console.log("ERROR: " + error)
}

module.exports = { onlineLog, offlineLog };