// start coding !

Array.prototype.flatMap = function(lambda) { 
  return Array.prototype.concat.apply([], this.map(lambda)); 
};

function transpose (interval, offset, note) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    deltaTime: note.deltaTime + offset,    
  });
}

var midi = F.simpleMidi()

midi.tracks[0] = midi.tracks[0].filter(F.isNote).flatMap(function(note){

  return [note, transpose(2, 5, note), transpose(4, 8, note)];

})

console.log(midi);

F.playMidi(midi)

