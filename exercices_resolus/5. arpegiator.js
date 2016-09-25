
function transpose (note, interval, dtime) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    absTime: note.absTime + dtime,    
  });
}

var midi = F.simpleMidi()

function applyIfNote(func) {
  return function (event) {
    return F.isNote(event) ? func(event) : event;
  }
}

function workInAbsoluteTime(track, func) {
  return F.toDeltaTime(F.toAbsoluteTime(midi.tracks[0]).flatMap(func));
}

midi.tracks[0] = workInAbsoluteTime(midi.tracks[0], applyIfNote(function(note){
  return [note, transpose(note, 2, 50), transpose(note, 4, 100)];
}));


F.playMidi(midi);

