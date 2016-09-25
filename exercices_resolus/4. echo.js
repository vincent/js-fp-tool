
function transpose (note, dtime, velocity) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    deltaTime: note.deltaTime + dtime,
    velocity: Math.floor(velocity)
  });
}

var midi = F.simpleMidi()

midi.tracks[0] = midi.tracks[0].filter(F.isNote).flatMap(function(note){

  return [note, transpose(note, 20, note.velocity/3)];

})

console.log(midi);

F.playMidi(midi)



