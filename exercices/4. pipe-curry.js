function noteValueToText(note) {
  var notes = [ 'do', 'ré', 'mi', 'fa' , 'sol', 'la', 'si'];
  return notes[note % 7];
}

// définir les fonctions map, join et addToDomElt
// pour au final afficher la version texte des notes dans le <div id="output" />


var displayNotes = F.pipe(
  	map(noteValueToText),
    join(' '),
    addtoDomElt('output')
);

displayNotes([1,2,3]);