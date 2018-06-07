const express = require('express');
const app = express();

const SHA256 = require("crypto-js/sha256");

const originalData = "Hallo Rick";
const originalHash = SHA256(originalData).toString();

const receivedData = "Hallo Riack";
const recreatedHash = SHA256(receivedData).toString();

console.log(originalHash);
console.log(recreatedHash);

if (originalHash === recreatedHash) {
    console.log('Hash verified');
} else {
    console.log('Hash not verified. WHO IS RESPONSIBLE FOR THIS?!?!');
}

module.exports = app;
