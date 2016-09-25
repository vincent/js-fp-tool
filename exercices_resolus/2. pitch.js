
function transpose (note) {
  return F.extend(note, {
    noteNumber: note.noteNumber + 8
  });
}

var midi = F.simpleMidi()

midi.tracks[0] = midi.tracks[0].filter(F.isNote).map(transpose)

console.log(midi);

F.playMidi(midi)

