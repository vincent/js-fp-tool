/**
Objectif: programmer un effet chord avancé, prenant en paramètre des gammes prédéfinies et faire que l'ensemble sonne bien.
Pour info: level hardcore ;)


Structure MIDI
{ header: { ... },
  tracks: [
    [
      {deltaTime:0,   channel:0, type:"channel", noteNumber:73, velocity:110, subtype:"noteOn" },
      ...
      {deltaTime:46,  channel:0, type:"channel", noteNumber:73, velocity:64,  subtype:"noteOff"},
      ...
      {deltaTime:0, type:"meta", subtype:"endOfTrack"}
    ]
  ]
};

*/

var midi = F.simpleMidi();
midi.header.ticksPerBeat = 120;

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



