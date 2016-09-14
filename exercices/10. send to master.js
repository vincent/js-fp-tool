// start coding !

function transpose(item) {
  if (item.subtype == 'noteOn') {
    item.noteNumber += 5;
  }
  return item;
}

function filter(midi) {
  //midi.tracks[2].forEach(transpose);
  return midi;
}

var host = '127.0.0.1'; // window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':4321');

function sendMidi(midi) {
  ws.send(JSON.stringify({type:'file', data:midi }));
}

ws.onopen = function () {
  loadRemote('midi/sml.mid', function(data) {
    midiFile = filter(MidiFile(data));

    debugger;

    sendMidi(midiFile);
  })
}