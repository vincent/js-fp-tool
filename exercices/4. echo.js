/**

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

function transpose (note, dtime, velocity) {
  return F.extend(note, {
    // attributs à remplacer
  })
}

var midi = F.simpleMidi()

// modifier la track 0 de `midi` pour répéter des notes
// en les décalant légèrement dans le temps
// et en atténuant leur velocité

F.playMidi(midi)

