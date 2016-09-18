// start coding !


Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
};


function clone(o){
  return JSON.parse(JSON.stringify(o));
}

function transpose (interval, note) {
  var result = clone(note);
  result.noteNumber += interval;
    result.deltaTime = 0;
  return result;
}

function isNote(n){ return n.subtype.match(/note/) }

var midi = simpleMidi()


midi.tracks[0] = midi.tracks[0].filter(isNote).flatMap(function(note){

  return [note, transpose(2, note), transpose(4, note)];

})

console.log(midi);

playMidi(midi)

