/**
Objectif: modifier la track 0 de `midi` 
pour remplacer chaque note par un accord {note, note + 1 ton, note + 2 tons}

Astuce: en midi, +1 sur un noteNumber augmente la note d'un demi-ton.

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



F.playMidi(midi)



