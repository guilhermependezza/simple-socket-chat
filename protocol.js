const { create } = require("domain");

function createMsg(objectMsg) {
  return JSON.stringify(objectMsg);
}

module.exports = {
  decodeMsg: function decodeMsg(msgBuffer) {
    return JSON.parse(msgBuffer.toString());
  },
  createChatMsg: function({data, senderId}) {
    return createMsg({ type: 'chat', data, senderId });
  },
  createBroadcastMsg: function(data) {
    return createMsg({ type: 'broadcast', data });
  },
  createEndMsg: function(data) {
    return createMsg({ type: 'end', data });
  },
  createConnectedSuccefullyMsg: function(data) {
    return createMsg({ type: 'connectedSuccefully', data });
  },
  createAcceptedFromServerMsg: function(data) {
    return createMsg({ type: 'acceptedFromServer', data });
  },
  createSetNameMsg: function(senderId, data) {
    return createMsg({
      type: 'setName',
      senderId,
      data
    });
  }
}
