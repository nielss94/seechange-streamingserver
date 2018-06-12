const express = require('express');
const app = express();

const fs = require('fs');
const RSA = require('node-rsa');

fs.readFileSync('./certificates/server.key');
fs.readFileSync('./certificates/server.crt');
fs.readFileSync('./certificates/exampleCA.crt');


const data = "Hallo Rick";
const keyData = "-----BEGIN PUBLIC KEY-----" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzul1PJDDi/wdZVPbFQwe" +
    "rqOqgP/oQW6d+5DTDcb37x/3/+u1GEPRhnWnUZM+LZ9i8DVqjrlmMTUgAO71B4PC" +
    "gRpQBDk6KWWeQXIyxW3VwzSyNNjCZPrvn4/0IIY4eNgKX9HhiaIBhaGLqV1DSH0W" +
    "85ri2GwqSChXpxjlBG/p3nN4sPX4/lHoXxq2KNMZ8/eqVV9WJ3TIMlWR2KhlVs+7" +
    "24rexM8Q8U+nAVA8Fot3a2kZ06lGyRM0cJM1AuwiDsxzEbXcvtyrRx/9G7l2+vW0" +
    "IHieharBiUF8sZ3GiESji5XTntbii73QthwhIVPatiJ9uJFqhUBe8mroGJaQfafX" +
    "rwIDAQAB" +
    "-----END PUBLIC KEY-----";

console.log(keyData);

const key = new RSA();
const pubKey = key.importKey(keyData, 'pkcsx1');
console.log(pubKey);

const digitalSignature = key.sign(data);
const integrityConfirmed = key.verify(data, digitalSignature);
console.log(integrityConfirmed);

module.exports = app;