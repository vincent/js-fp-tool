
Array.prototype.flatMap = function(lambda) { 
  return Array.prototype.concat.apply([], this.map(lambda)) 
};

function transpose (interval, offset, velocity, note) {
  return F.extend(note, { })
}

var midi = F.simpleMidi()

F.playMidi(midi)



