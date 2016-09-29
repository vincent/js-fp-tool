/**
Objectif: modifier la track 0 de `midi` 
Pour chaque note, ajouter 2 notes décalées de 50 ticks et de 2 tons

Astuce: en midi, +1 sur un noteNumber augmente la note d'un demi-ton.
Astuce: en midi 1 beat = une unité de temps. C'est une unité relative paramétrée
par un attribut des headers de la track, ticksPerBeat
Astuce: en ajoutant des notes, on décale chaque temps
car le MIDI travaille en temps relatif

=> modifier le code pour utiliser
    F.toAbsoluteTime() et F.toDeltaTime()
    pour travailler en temps absolu


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

function transpose (note, dtime, interval) {
  return F.extend(note, {
    // attributs à remplacer
  })
}

var midi = F.simpleMidi()


F.playMidi(midi)





