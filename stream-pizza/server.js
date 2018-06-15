const server = require('http').createServer();
const io = require('socket.io').listen(server);
const RSA = require('node-rsa');
const NodeMediaServer = require('node-media-server');

keyData = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu/TGs6MXXHCfCLfrP6Ku
QSyjPO6RHajxEEKeLGSsNdJKQ8k1NW9qRa5QNMvNu/m3ezjtqIN9Evy+puHuzPGC
X99R+OSbEFV2tLeaTwjpQCDTBGBWqby5HlxXuxU3lPo6VY07Z1uJiv50jClg1kCs
cSLhh/fI8IYsdfCGlFKmNEiarMdHNdYscTgZ86gPnPEWAHQFBXT/XYNR8Wtzwk0W
9Le+m2eFHuXFOxNG/Y6gwBze4gJxvFaq9BP4o8I1e4MD9Vcn+qA3T5iBRPtCEB5J
GjfpQKHT/2sVl0z1YfBGi4okyfBf/tdZvqjR44yLv0hEtq2DDu75xbrjkmUR0fN0
4QIDAQAB
-----END PUBLIC KEY-----`;

let key = new RSA(`-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEAu/TGs6MXXHCfCLfrP6KuQSyjPO6RHajxEEKeLGSsNdJKQ8k1
  NW9qRa5QNMvNu/m3ezjtqIN9Evy+puHuzPGCX99R+OSbEFV2tLeaTwjpQCDTBGBW
  qby5HlxXuxU3lPo6VY07Z1uJiv50jClg1kCscSLhh/fI8IYsdfCGlFKmNEiarMdH
  NdYscTgZ86gPnPEWAHQFBXT/XYNR8Wtzwk0W9Le+m2eFHuXFOxNG/Y6gwBze4gJx
  vFaq9BP4o8I1e4MD9Vcn+qA3T5iBRPtCEB5JGjfpQKHT/2sVl0z1YfBGi4okyfBf
  /tdZvqjR44yLv0hEtq2DDu75xbrjkmUR0fN04QIDAQABAoIBAA6T5pFqNdaimYMY
  mLNfz7oYVzTToAe34bKMKC5zRHQMMlxdj7XsRUbQRUJDCFrq/FMfUDeAs0O0vKi+
  30Gf/aen73ipamly53kOwHYez9B8e0Fco3wYuhbjvJ4zABOa8MlP4eqbS+iu4aU5
  VFxpubYwqWNdUYVuMqaXGCkK2/8z/Ceh6Iv/F7tqEOEwwaTuoBWjb9y7Ew7mFIm8
  YXG8VYcS6GOrJv3EUrnefxJ2a26g29uejn3KgWxZNJ5jFlvAdB9xcPGYe1cYhmTD
  7wGjtmiYOT3jjfM6OJbxmZrLm+w4iZqCeScU1mD095en5cnaryLXOtG6FB7azS+k
  UutqV60CgYEA9NpEFajDFWPNo9hhjv8hRkAz01yLVPepZ1d7kC/2WwEA3TpGz1F0
  JZ5eFDxkspY8SOSCzk02eUcxbDP13spNBouWGIZOVbWNUjXVNdH9BHR/YnwGz3l2
  qlAWg915qH9E3VkKBtICvGRT6s+igKsrpbBnm+H1d6Y8xlLSzUWxBS8CgYEAxINj
  NBL1yrm4nIV2AQKGrqYJBS4UCEcSZxw7k7BEIvnjIIG8gMX5YUB67hxMO8Wja2ia
  EuwhFv1ioDMsv4H6nfqFqWpGp0BNSXxSOn+RH8P1LEIfbsB4FGRdJUv+nUAsNOea
  kU2RTiQFmiQBinYliT2nrTV9xZBP0+Vk6XPewu8CgYBmLL7EmwvtXRxvBtiPJ3/n
  JNt7k97AsiiK60KwxJL1HtIRf0QVN1RUbmWr5BfRPkgh0tmS5T2aFk9Va8lqEtlZ
  pd4YldMSiRRT/grezqXauhJ+MmtVIMaYA5uho0YlPhaql4FLn09s9iDel46kSsmH
  9rkFn6EjMMejquQ0rKRWGQKBgCZzKrrqpssGsbd2aZNjAiUz+XnY/TRta41fOcz4
  5SwOxsD6gX6UvemoayUhxky/q+z9J4BiUUslQuHjgXLrJLU6amKul6pr63Ngbtph
  UWzss5D4Uxwhbp1W0d7VUrlD8CJd2qFpku++HpZ9SwvjeA61UJSUbcp1JRlpvefr
  sv9jAoGBANFg8YdnaowlmXqCeT0sKspLsG6qg1wmB2SyUPGjFNUgn3VxY6ANk+ji
  r5eFZev3E+A7X4ce+dYvEUhjJdpt3URXHLg9M2sdRK45BudiPo+8jK7B55xzk4yZ
  idFTJbPFh61asYuL5NFoN9k5AV6/j9FS03RKFYflFryeQZVYjw1X
  -----END RSA PRIVATE KEY-----`);
    
  // encryptedData = key.encryptPrivate('test', 'buffer', 'utf8');
  // console.log(encryptedData);

  // key.importKey(keyData, 'public');
  // decryptedData = key.decryptPublic(encryptedData);
  // console.log(decryptedData.toString('utf8'));

const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 10000,
    gop_cache: false,
    ping: 20,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();

let previousTimestamp;
let packetStore = [];

nms.on('preConnect', (id, args) => {
 console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
 
 setInterval(() => {
   try{
     let session = nms.getSession(id);
     
     session.inPackets.forEach((element, i) => {
       let timestamp = element.header.timestamp;
       
       if(timestamp != previousTimestamp && i == 6){
         console.log(`==========SESSION HEADER INFO============`);
         console.log(`${timestamp} on RTMP`);
         console.log(session.parserPacket.payload);
         
         previousTimestamp = timestamp;
        // matchTimestamp(timestamp);
       }
     });
   }catch(e) {
     console.log(e);
   }
 },10);
});

async function matchTimestamp(timestamp) {
 let matchObj;
 await setTimeout(() => {
   packetStore.forEach(element => {
     if(element.absoluteMadTime === timestamp){
       matchObj = {
         packetStamp: element.absoluteMadTime,
         rtmpStamp: timestamp
       }
     }
   });
   if(matchObj){
     console.log(`${timestamp} MATCHED with a received packet`);
     console.log(matchObj);
   }else{
     console.log(`${timestamp} DID NOT MATCH with a received packet`);
   }
 },10)
}
 
nms.on('postConnect', (id, args) => {
 console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});
 
nms.on('doneConnect', (id, args) => {
 console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});
 
nms.on('prePublish', (id, StreamPath, args) => {
 console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
 // let session = nms.getSession(id);
 // session.reject();
});
 
nms.on('postPublish', (id, StreamPath, args) => {
 console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
nms.on('donePublish', (id, StreamPath, args) => {
 console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
nms.on('prePlay', (id, StreamPath, args) => {
 console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
 // let session = nms.getSession(id);
 // session.reject();
});
 
nms.on('postPlay', (id, StreamPath, args) => {
 console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
nms.on('donePlay', (id, StreamPath, args) => {
 console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

function addPacket(packet) {
 packetStore.push(packet);
}

io.on('connection', socket => {  

 // keyData = `-----BEGIN PUBLIC KEY-----
 // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0
 // FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/
 // 3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB
 // -----END PUBLIC KEY-----`;

 socket.on('packet', packet => {
   //p = JSON.parse(packet);
   console.log(`==========PACKET============`);
   //console.log(p.absoluteMadTime);
   console.log(packet);
   buffer = Buffer.from(packet, "hex");
   console.log(buffer);
   if(keyData != ''){
    //  let key = new RSA({b: 1024});

    //  key.importKey(keyData, 'public');
    //  decryptedData = key.decryptPublic(buffer);
    //  console.log(decryptedData);
   }
   //addPacket(p);
 });

 socket.on('publickey', key => {
   console.log(`==========PUBLIC KEY============`);
   console.log(key);
   
   //keyData = `-----BEGIN PUBLIC KEY-----${key}-----END PUBLIC KEY-----`;
   //console.log(keyData);
   
 });


 socket.on('disconnect', () => {
     console.log(`${socket.id} disconnected`);
 });
});

server.listen(3000, () => {
  console.log(`listening on port 3000`);
});
