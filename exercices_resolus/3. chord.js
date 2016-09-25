
function transpose (note, interval) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    deltaTime: 0,    
  });
}

var midi = F.simpleMidi()

midi.tracks[0] = midi.tracks[0].filter(F.isNote).flatMap(function(note){

  return [note, transpose(2, note), transpose(note, 4)];

})

console.log(midi);

F.playMidi(midi)

