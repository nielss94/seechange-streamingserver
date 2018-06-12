const server = require('http').createServer();
const io = require('socket.io').listen(server);

const NodeMediaServer = require('node-media-server');
 
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
 
var nms = new NodeMediaServer(config)
nms.run();


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
  });

  socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
  })
});

server.listen(3000, () => {
  console.log(`listening on port 3000`);    
});