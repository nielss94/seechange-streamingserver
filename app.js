const express = require('express');
const app = express();
const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');
const cryption = require('./crypto/cryptography');

var msg = "Dit wordt, hopelijk, ge-encrypt";
console.log("Original state: " + msg);

var encryptedMsg = cryption.encryptText(msg);
console.log("Encrypted msg: " + encryptedMsg);

var decryptedMsg = cryption.decryptText(encryptedMsg);
console.log("Decrypted msg: " + decryptedMsg);

// msg 1
const originalData = "Hallo Rick";
const originalHash = SHA256(originalData).toString();

// msg 2
const receivedData = "Hallo Rick";
const recreatedHash = SHA256(receivedData).toString();

console.log(originalHash);
console.log(recreatedHash);

if (originalHash === recreatedHash) {
    console.log('Hash verified');
} else {
    console.log('Hash not verified. WHO IS RESPONSIBLE FOR THIS?!?!');
}

module.exports = app;