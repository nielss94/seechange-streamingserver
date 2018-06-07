const crypto = require('crypto');

var config = {
    encryption: 'aes-256-cbc',
    cryptkey: crypto.createHash('sha256').update('Nixnogen').digest(),
    iv: 'a2xhcgAAAAAAAAAA'
}