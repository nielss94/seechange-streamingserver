const express = require('express');
const app = express();

const RSA = require('node-rsa');


const data = "Hallo Rick";
const key = new RSA({ b: 512 });

const digitalSignature = key.sign(data);
const integrityConfirmed = key.verify(data, digitalSignature);
// console.log(integrityConfirmed);

module.exports = app;