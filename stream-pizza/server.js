const server = require('http').createServer();
const io = require('socket.io').listen(server);
const RSA = require('node-rsa');
const NodeMediaServer = require('node-media-server');
 
const config = {
  logType: 3,
  rtmp: {
    port: 1999,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
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

  keyData = '';

  socket.on('packet', packet => {
    //p = JSON.parse(packet);
    console.log(`==========PACKET============`);
    //console.log(p.absoluteMadTime);
    console.log(packet);
    buffer = Buffer.from(packet, "hex");
    console.log(buffer);
    if(keyData != ''){
      let key = new RSA();
      let pubKey = key.importKey(keyData, 'pkcsx1');
      console.log(pubKey);
      decryptedData = key.decryptPublic(buffer);
      console.log(decryptedData);
    }
    
    //addPacket(p);
  });

  socket.on('publickey', key => {
    console.log(`==========PUBLIC KEY============`);
    console.log(key);
    
    keyData = `-----BEGIN PUBLIC KEY-----${key}-----END PUBLIC KEY-----`;
    console.log(keyData);
    
  });


  socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log(`listening on port 3000`);    
});
