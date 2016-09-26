var minorIntervals = [0, 2, 3, 5, 7, 8, 10];
var majorIntervals = [0, 2, 4, 5, 7, 9, 11];
var exoticIntervals= [0, 1, 4, 5, 7, 8, 10];
var fundamental = 60; //We need to know it depending of the midi track
var scale = majorIntervals;

function _harmonize(note, noteIncrement) {
    let nextNote = note + noteIncrement;
    let nextInterval = nextNote%scale.length;
    if(nextInterval < 0) nextInterval += scale.length; //to be sure it is in the intervals array
    let octave = Math.floor(nextNote / scale.length);

    return scale[nextInterval] + 12 * octave - scale[note];
}

function _detectNote(midiNote) {
    let relativeInterval = midiNote - fundamental;
    relativeInterval = relativeInterval%12;
    if(relativeInterval < 0) relativeInterval += 12; //to be sure it is in the intervals array
    var octave = Math.floor(relativeInterval/12);

    var nearestNote = 0;

    scale.forEach(function(interval) {
        if(Math.abs(interval - relativeInterval) <= Math.abs(scale[nearestNote] - relativeInterval))
            nearestNote = scale.indexOf(interval);
    });

    return nearestNote + scale.length * octave;
}


Array.prototype.flatMap = function(lambda) { 
  return Array.prototype.concat.apply([], this.map(lambda)); 
};

function transpose(note, interval) {
  return F.extend(note, {
    noteNumber: note.noteNumber + interval,
    deltaTime: 0,    
  });
}

//Return an array of midi notes representing a chord
function chord(midiNote) {
    var note = _detectNote(midiNote.noteNumber);
      midiNote.noteNumber = fundamental + scale[note];
    return [
      midiNote,
      transpose(midiNote, _harmonize(note, 2)), //generally a third
      transpose(midiNote, _harmonize(note, 4))  //generally a fifth
    ];
};


var midi = F.simpleMidi();
midi.header.ticksPerBeat = 120;

//Example track, just some chords one-by-one to clearly distinguish the different notes
midi.tracks[0] = [
  {channel: 0, deltaTime: 0,   noteNumber: 60, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 60, subtype: "noteOff", type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 62, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 62, subtype: "noteOff", type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 64, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 64, subtype: "noteOff", type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 65, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 65, subtype: "noteOff", type: "channel", velocity: 110},
 
  {channel: 0, deltaTime: 100, noteNumber: 64, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 64, subtype: "noteOff", type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 65, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 65, subtype: "noteOff", type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 67, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 67, subtype: "noteOff", type: "channel", velocity: 110},
  {channel: 0, deltaTime: 100, noteNumber: 69, subtype: "noteOn",  type: "channel", velocity: 110},
  {channel: 0, deltaTime: 200, noteNumber: 69, subtype: "noteOff", type: "channel", velocity: 110}
];

midi.tracks[0] = midi.tracks[0].filter(F.isNote).flatMap(function(note) {return chord(note);})

console.log(midi);

F.playMidi(midi)

