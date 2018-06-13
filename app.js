const payload =
{ 
    "hash": "9fc6d5abda83152d7409acafc5b0d26249e82c272e9af214002d7edb9e766cdc",
    "messageType": "VIDEO",
    "absoluteMadTime": 6728,
    "buffer": "<Buffer 27 01 00 00 00 00 00 14 25 21 e4 02 78 20 08 b2 aa ae 26 45 f1 f9 f3 b7 eb e0 80 26 3f 5c 99 fd f0 42 12 08 ef e9 d7 63 c1 00 44 23 bf df 8f 63 1a 61 ... >"
}

const buffer = payload.buffer;
const otherBuffer = "<Buffer 27 01 00 00 00 00 00 14 25 21 e4 02 78 20 08 b2 aa ae 26 45 f1 f9 f3 b7 eb e0 80 26 3f 5c 99 fd f0 42 12 08 ef e9 d7 63 c1 00 44 23 bf df 8f 63 1a 61 ... >";
const substring = otherBuffer.substr(8, (otherBuffer.length - 14));
const array = substring.split(' ').map(function(item) {
    return parseInt(item, 10)
});

console.log(substring);
console.log(array);
