/**
Objectif: modifier la track 0 de `midi` 
pour jouer chaque note un octave plus haut

Astuce: utiliser F.extend(object, { ... }) qui retourne un clone d'object
en lui passant les attributs à modifier.
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



