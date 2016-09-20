// start coding !

Array.prototype.flatMap = function(lambda) { 
  return Array.prototype.concat.apply([], this.map(lambda)); 
};

function transpose (interval, offset, note) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    absTime: note.absTime + offset,    
  });
}

var midi = F.simpleMidi()

midi.tracks[0] = F.toDeltaTime(F.toAbsoluteTime(midi.tracks[0]).filter(F.isNote).flatMap(function(note){
  return [note, transpose(2, 50, note), transpose(4, 100, note)];
}))


F.playMidi(midi);

