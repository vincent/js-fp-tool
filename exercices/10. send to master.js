// start coding !

var websocket;

F.createWebSocket('127.0.0.1')
  .then(function (ws) {
    websocket = ws;
    return F.loadRemotePromised('midi/sml.mid');
  })
  .then(function (midi) {
    websocket.send(JSON.stringify({ type:'file', data:midi }));
  })
  .fail(function (error) {
    console.error('shit happened', error);
  })



