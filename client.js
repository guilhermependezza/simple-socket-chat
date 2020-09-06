const net = require('net');
const protocol = require('./protocol');

console.log(process.argv[2])

const client = net.connect(3000);
let senderId;

client.on('data', data => {
  const msg = protocol.decodeMsg(data);

  if(msg.type === 'end') {
    return;
  }

  if(msg.type === 'acceptedFromServer') {
    senderId = msg.data;
    client.write(protocol.createSetNameMsg(senderId, process.argv[2] || 'tloxa'))
  }

  if(msg.type === 'broadcast') {
    console.log(msg.data);
  }
});

process.stdin.on('data', data => {
  const msg = data.toString().trim().replace(/\n/, '');

  if(msg) {
    client.write(protocol.createChatMsg({
      data: data.toString().replace(/\n/, ''),
      senderId
    }));
  }
})