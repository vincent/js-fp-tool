// start coding !


Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
};


function clone(o){
	return JSON.parse(JSON.stringify(o));
}

function transpose (interval, offset, velocity, note) {
	var result = clone(note);
	result.noteNumber += interval;
   	result.velocity = Math.floor(velocity);
  	result.deltaTime += offset;
	return result;
}

function isNote(n){ return n.subtype.match(/note/) }

var midi = F.simpleMidi()


midi.tracks[0] = midi.tracks[0].filter(isNote).flatMap(function(note){

	return [note, transpose(0, 20, note.velocity/3, note)];

})

console.log(midi);

F.playMidi(midi)



