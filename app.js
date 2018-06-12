const express = require('express');
const app = express();
const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');
const cryption = require('./crypto/cryptography');
const keys = require('./crypto/cryptokeys')
const AES = require('crypto-js/aes');
const UTF8 = require('crypto-js/enc-utf8');
const RSA = require('node-rsa');
const NodeMediaServer = require('node-media-server');

const data = "Hallo Rick";
const key = new RSA({ b: 512 });
const privatekey = new RSA(keys.privateKey);
console.log(key);
console.log(privatekey);

const digitalSignature = key.sign(data);
const integrityConfirmed = key.verify(data, digitalSignature);

console.log(digitalSignature);
console.log(integrityConfirmed);

module.exports = app;