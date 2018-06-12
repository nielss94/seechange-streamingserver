const fs = require('fs');

function storeKey(key) {
    const keyString = JSON.stringify(key);
    fs.appendFile('./keyfile')
}

function verifyData() {
    
}

module.exports = {storeKey, verifyData};