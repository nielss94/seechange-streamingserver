const express = require('express');
const app = express();
const crypto = require('crypto');
const config = {
    encryption: 'aes-256-cbc',
    cryptkey: crypto.createHash('sha256').update('Nixnogen').digest(),
    iv: 'a2xhcgAAAAAAAAAA'
}

function encryptText(text) {
    var cipher = crypto.createCipheriv(config.encryption, config.cryptkey, config.iv);
    return Buffer.concat([
        cipher.update(text),
        cipher.final()
    ]).toString('base64');
}

function decryptText(text) {
    var decipher = crypto.createDecipheriv(config.encryption, config.cryptkey, config.iv);
    return Buffer.concat([
        decipher.update(text, 'base64'),
        decipher.final()
    ]).toString();
}

module.exports = {decryptText, encryptText};


