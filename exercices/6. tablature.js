/**

Structure MIDI
{ header: { ... },
  tracks: [
    [
      {deltaTime:0,   channel:0, type:"channel", noteNumber:73, velocity:110, subtype:"noteOn" },
      {deltaTime:46,  channel:0, type:"channel", noteNumber:73, velocity:64,  subtype:"noteOff"},
      ...
      {deltaTime:0, type:"meta", subtype:"endOfTrack"}
    ]
  ]
};

*/

var track = F.simpleTrack();

// créer la tablature
var sheet = F.musicSheet();

// placer les notes 4 par 4 sur la tablature
// avec sheet.addNotes( tableau )

// par exemple
sheet.addNotes([
  F.eventToNoteName({ noteNumber:65 }),
  F.eventToNoteName({ noteNumber:61 }),
  F.eventToNoteName({ noteNumber:67 }),
  F.eventToNoteName({ noteNumber:68 })
]);

sheet.draw();
