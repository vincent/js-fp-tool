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

function transpose (note, interval) {
  return F.extend(note, {
    // attributs à remplacer
  })
}

var midi = F.simpleMidi()

// modifier la track 0 de `midi` 
// pour ajouter des accords à chaque note

F.playMidi(midi)



