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

function transpose (note, dtime, interval) {
  return F.extend(note, {
    // attributs à remplacer
  })
}

var midi = F.simpleMidi()

// modifier la track 0 de `midi` 
// pour ajouter des accords à chaque note
// en les décalant légèrement dans le temps

F.playMidi(midi)


// problème: en ajoutant des notes, on décale chaque temps
// car le MIDI travaille en relatif

// => modifier le code pour utiliser
//    F.toAbsoluteTime() et F.toDeltaTime()
//    pour travailler en temps absolu


