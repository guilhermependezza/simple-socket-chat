const net = require('net');
const protocol = require('./protocol');

const connections = [];

function broadcast(msg, senderId) {
  connections.forEach(c => {
    if(c.id !== senderId) {
      c.connection.write(protocol.createBroadcastMsg(msg))
    }
  });
}

net.createServer(connection => {
  const generatedId = Date.now();
  connections.push({
    id: generatedId,
    connection
  });
  connection.on('data', data => {
    const msg = protocol.decodeMsg(data);

    if(msg.type === 'connectedSuccefully') {
      connection.write(protocol.createEndMsg('é nóis'));
      return;
    }

    if(msg.type === 'chat') {
      console.log('chat: ', msg.data);
      const name = connections.find(c => c.id === msg.senderId).name;
      broadcast(`${name} diz: ${msg.data}`, msg.senderId);
    }

    if(msg.type === 'setName') {
      connections.forEach((c, index) => {
        if(msg.senderId === c.id) {
          connections[index].name = msg.data
        }
      });
      connection.write(protocol.createEndMsg('name setted'));
    }
  })
  
  connection.write(protocol.createAcceptedFromServerMsg(generatedId));
}).listen(3000);
