
var keys = ['C','C#','D','D#','E','F', 'F#','G','G#', 'A', 'A#', 'B'];

function noteNumberToKey(note) {
	return keys[note % 12]+(Math.floor(note / 12)); 
}

var names = F.simpleTrack().filter(F.isNoteOn).map(function (event) {
  return noteNumberToKey(event.noteNumber);
})

function groupBy(arr, c) {
  var r = [];
  var a = [].concat(arr);
  do {
    r.push(a.splice(0, c));
  } while (a.length);
  return r;
}

var vf = new Vex.Flow.Factory({
  renderer: {selector: 'sandbox', width: 600, height: 600}
});

var score = vf.EasyScore();
var system = vf.System();

groupBy(names, 4).map(function(g){
  system.addStave({
    voices: [
      score.voice(score.notes(g.join(', '), {stem: 'up'})).setStrict(false)
    ]
  }).addClef('treble');
});

vf.draw();

