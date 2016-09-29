/**
Objectif: modifier la track 0 de `midi` pour répéter 
chaque note une fois avec un léger décalage de 20 beats 
et avec une vélocité divisée par 2

Astuce: en midi 1 beat = une unité de temps. C'est une unité relative paramétrée
par un attribut des headers de la track, ticksPerBeat

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

F.playMidi(midi)

