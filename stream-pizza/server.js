const server = require('http').createServer();
const io = require('socket.io').listen(server);
const NodeMediaServer = require('node-media-server');
const ursa = require('ursa');
const fs = require('fs');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const uuidV4 = require('uuid/v4');
const sha256 = require('js-sha256');
const { addUser, removeUser } = require('./database/db.meta');
const mongodb = require('./database/db.config');
const routes = require('./routes.metadata');
const express = require('express');
const app = express();

const config = {
  logType: 3,
  rtmp: {
    port: 1999,
    chunk_size: 10000,
    gop_cache: false,
    ping: 20,
    ping_timeout: 30
  },
  http: {
    port: 42069,
    mediaroot: './media',
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config);
nms.run();

// routes:
// Allow acces to angular:
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/', routes);

// processing video streams
let streamMediaPath;

function processVideo(path) {
    let args = [
        '-loglevel', 'error',
        '-i', 'rtmp://188.166.127.54'+path,
        '-x264opts', 'keyint=60:no-scenecut',
        '-s', '480x640',
        '-profile:v', 'main',
        '-r', '30',
        '-b:v', '1000k',
        '-profile:v','main',
        '-preset','veryfast',
        '-c:a','copy',
        '-strict','-2',
        '-sws_flags','bilinear',
        '-hls_list_size','6',
        '-hls_time','2','/var/www/stream-pizza/media/'+path+'/index.m3u8'
    ];

    let ffmpeg = spawn('ffmpeg', args);
    ffmpeg.then(function () {
        console.log('[spawn] done!');
    })
    .catch(function (err) {
        console.error('[spawn] ERROR: ', err);
    });
}

//create directories
const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
};

let previousTimestamp;
let packetStore = [];

nms.on('preConnect', (id, args) => {
 console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
 
 setInterval(() => {
   try{
     let session = nms.getSession(id);
     
     session.inPackets.forEach((element, i) => {
       let timestamp = element.header.timestamp;
       
       if(timestamp !== previousTimestamp && i === 6){
        //  console.log(`==========SESSION HEADER INFO============`);
        //  console.log(`${timestamp} on RTMP`);
        //  console.log(session.parserPacket.payload);
         
         previousTimestamp = timestamp;
        // matchTimestamp(timestamp);
       }
     });
   }catch(e) {
    //  console.log(e);
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

 streamMediaPath = config.http.mediaroot + StreamPath;
 mkdirSync(path.resolve(streamMediaPath));
 processVideo(StreamPath);

});
 
nms.on('donePublish', (id, StreamPath, args) => {
 console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

 //archive folder
 fs.rename(streamMediaPath, streamMediaPath + '-' + uuidV4(), function (err) {
   if (err) throw err;
   console.log('renamed complete');
 });
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

  keyData = '';
  pkey = null;
  metaData = null;

  socket.on('certificate', cert => {
    let decryptedCert = pkey.publicDecrypt(cert, 'hex', 'utf8');
    console.log(`==========CERTIFICATE============`);
    console.log(decryptedCert);
    metaData = decryptedCert;
  });

  socket.on('certificateHash', cert => {
    console.log(`==========CERTIFICATEHASH============`);
    let decryptedCert = pkey.publicDecrypt(cert, 'hex' ,'utf8');
    console.log(metaData);
    let hashMeta = sha256.hmac('SUPERSECRETHASHTHING', metaData);
    console.log(decryptedCert);
    console.log('============================================');
    console.log(hashMeta);
    
     if (hashMeta === decryptedCert) {
       console.log("---------VERIFIED--------");
       addUser(metaData);
     } else {
       console.log("---------UNVERIFIED--------");
     }
  });

  socket.on('packet', packet => {
    // console.log(`==========PACKET============`);
    // console.log(packet);
    
    let decryptedData = pkey.publicDecrypt(packet, 'hex', 'utf8');

    const p = JSON.parse(decryptedData);

    // console.log(`======DECRYPTED DATA========`);
    // console.log(p);
    //addPacket(p);
  });

  socket.on('publickey', (key, callback) => {
    keyData = `-----BEGIN PUBLIC KEY-----\n${key}-----END PUBLIC KEY-----\n`;
    if(!pkey) {
      pkey = ursa.createPublicKey(Buffer.from(keyData),'utf8');
    } 
    callback(true);
  });

  socket.on('stopStream', () => {
    console.log('Stream is stopped');
    removeUser(metaData);
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    removeUser(metaData);
  });
});

server.listen(6969, () => {
  console.log(`listening on port 3000`);
});

app.listen(5555, () => {
  console.log('APP is listening on port 5555');
});
