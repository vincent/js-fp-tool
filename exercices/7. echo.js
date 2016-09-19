
Array.prototype.flatMap = function(lambda) { 
  return Array.prototype.concat.apply([], this.map(lambda)); 
};

function transpose (interval, offset, velocity, note) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    deltaTime: note.deltaTime + offset,
    velocity: Math.floor(velocity)
  });
}

var midi = F.simpleMidi()

midi.tracks[0] = midi.tracks[0].filter(F.isNote).flatMap(function(note){

  return [note, transpose(0, 20, note.velocity/3, note)];

})

console.log(midi);

F.playMidi(midi)



