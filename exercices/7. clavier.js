/**
Objectif: "jouer" les notes sur un clavier virtuel.
Afficher un clavier virtuel. Lorsque chaque note doit être jouée, changer le style de la touche correspondante.
Le clavier fourni a des touches avec un id de la forme "kXX" avec XX la note correspondant à la touche.
Chaque touche peut avoir la classe "pressed" qui simule l'appui sur la touche.

Astuce: créer une fonction nextNote(track, index) qui 
- gère la classe "pressed"
- et utilise setTimeout(function, note.deltaTime * 3)

Structure MIDI
{
  header:{
    ...
  },
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

// ajout du clavier virtuel
document.getElementById('sandbox').innerHTML = F.keyboard();

// ajouter / retirer la classe "pressed" d'une touche
document.getElementById('k69').classList.toggle('pressed', true);

// récupérer les notes
var track = F.simpleTrack().filter(F.isNote);


