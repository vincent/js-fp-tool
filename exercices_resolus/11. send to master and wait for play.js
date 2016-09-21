
function transpose(item) {
  if (item.subtype == 'noteOn') {
    item.noteNumber += 5;
  }
  return item;
}

function filter(midi) {
  midi.tracks[2].forEach(transpose);
  return midi;
}

var websocket;

F.createWebSocket('127.0.0.1')
  .then(function (ws) {
    websocket = ws;
    return F.loadRemotePromised('midi/sml.mid');
  })
  .then(function (midi) {

    midi = filter(midi);

    websocket.onmessage = function (event) {
      if (event.type == 'play')
        F.playMidi(midi);
    };

    websocket.send(JSON.stringify({ type:'file', data:midi }));
  })
  .fail(function (error) {
    console.error('shit happened', error);
  });


