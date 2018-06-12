const server = require('http').createServer();
const io = require('socket.io').listen(server);

const NodeMediaServer = require('node-media-server');
const RSA = require('node-rsa');
 
const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};
 
const nms = new NodeMediaServer(config)
nms.run();

// Data received from Android client
// [data, digital signature, public key]
const data = "Hallo Rick";
const digitalSig = 'foiefjoewfj';
const pubKey = "-----BEGIN PUBLIC KEY-----" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzul1PJDDi/wdZVPbFQwe" +
    "rqOqgP/oQW6d+5DTDcb37x/3/+u1GEPRhnWnUZM+LZ9i8DVqjrlmMTUgAO71B4PC" +
    "gRpQBDk6KWWeQXIyxW3VwzSyNNjCZPrvn4/0IIY4eNgKX9HhiaIBhaGLqV1DSH0W" +
    "85ri2GwqSChXpxjlBG/p3nN4sPX4/lHoXxq2KNMZ8/eqVV9WJ3TIMlWR2KhlVs+7" +
    "24rexM8Q8U+nAVA8Fot3a2kZ06lGyRM0cJM1AuwiDsxzEbXcvtyrRx/9G7l2+vW0" +
    "IHieharBiUF8sZ3GiESji5XTntbii73QthwhIVPatiJ9uJFqhUBe8mroGJaQfafX" +
    "rwIDAQAB" +
    "-----END PUBLIC KEY-----";

// Create Node-RSA key object from received public key
const key = new RSA();
key.importKey(pubKey, 'pksc1');

// Verify digital signature
const integrityConfirmed = key.verify(data, digitalSignature);

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  //let session = nms.getSession(id);
  // session.reject();
  
  setInterval(() => {
    try{
      let session = nms.getSession(id);
      console.log(`==========SESSION HEADER INFO============`);
      //console.log(session.parserPacket.payload);
      console.log(session);
      session.inPackets.forEach(element => {
        console.log(element.header);
      });

    }catch(e) {
      console.log(e);
      
    }
  },20);
});
 
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


io.on('connection', socket => {
  socket.on('packetpack', data => {
    //console.log(`==========PACKETPACK1============`);
    //console.log(data);
  });
  
  socket.on('packet', data => {
    console.log(`==========PACKET============`);
    console.log(data);
  });

  socket.on('packetpack2', data => {
    //console.log(`==========PACKETPACK2============`);
    //console.log(data);
  });

  socket.on('publickey', key => {
    console.log(`==========PUBLIC KEY============`);
    console.log(key);
    storeKey(key);
  });

  socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
  })
});

server.listen(3000, () => {
  console.log(`listening on port 3000`);    
});