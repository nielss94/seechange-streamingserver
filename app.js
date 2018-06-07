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
const SHA256 = require('crypto-js/sha256');
const AES = require('crypto-js/aes');
const UTF8 = require('crypto-js/enc-utf8');

// Symmetric key
const key = '123';

// Data received from Android App
const data = "Hallo Rick";
const hash = SHA256(data).toString();
const cipherHash = AES.encrypt(hash, key);

const plainHash = AES.decrypt(cipherHash, key).toString(UTF8);

console.log(hash);
console.log(plainHash);

if (hash === plainHash) {
    console.log('Integrity confirmed!');
} else {
    console.log('NO INTEGRITY. WHO IS RESPONSIBLE FOR THIS?!?!');
}

module.exports = app;