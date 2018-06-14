const verify = require('./verifyData');
const payload = { 
    digitalSignature: '153630cc4dde0baeb68ea7349684d66caf96816e633d0d6de52deb7aab184f86ac67a87b0fa0b165181067ac7ce5002b6ac3dc4f48f003308d33c8c3dbfaf802d79c3e796c4af50655db4178aa1b2c27afbdbfc602e7f16707ed6a9dd436ff6c72bc262780415749984e0bea9a39816756032e1f7f892504264d680715754918',
    messageType: 'VIDEO',
    absoluteMadTime: 2167 
}



const otherBuffer = "<Buffer 27 01 00 00 00 00 00 14 25 21 e4 02 78 20 08 b2 aa ae 26 45 f1 f9 f3 b7 eb e0 80 26 3f 5c 99 fd f0 42 12 08 ef e9 d7 63 c1 00 44 23 bf df 8f 63 1a 61 ... >";
const substring = otherBuffer.substr(8, (otherBuffer.length - 14));
const array = substring.split(' ').map(function(item) {
    return parseInt(item, 10)
});

console.log(substring);
console.log(array);
