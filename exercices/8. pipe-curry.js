/**
Objectif: afficher dans la page la liste des notes au format texte en respectant la structure de code ci-dessous.
Pour cela il faut convertir un tableau de notes sous forme d'entiers vers du texte puis ajouter ce texte dans le dom (dans <div id="output" />)
Vous allez devoir définir les fonctions curryées map(), join() et addToDomElt()


Astuce: vous pouvez développer vos fonctions curriées à la main ou utiliser l'api F.curry
*/

var notes = [1,2,3];

function noteValueToText(note) {
  var notes = [ 'do', 'ré', 'mi', 'fa' , 'sol', 'la', 'si'];
  return notes[note % 7];
}

var displayNotes = F.pipe(
  	map(noteValueToText),
    join(' '),
    addtoDomElt('output')
);

displayNotes(notes);
