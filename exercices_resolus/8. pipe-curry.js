function noteValueToText(note) {
  var notes = [ 'do', 'ré', 'mi', 'fa' , 'sol', 'la', 'si'];
  return notes[note % 7];
}

var addtoDomElt = F.curry(function(elem, text) {
   	parent.document.getElementById(elem).innerHTML = text;
});

var join = F.curry(function(spacer, tab) {
 return tab.join(spacer); 
});

var map = F.curry(function(fcn, tab) {
  return tab.map(fcn);
});


var displayNotes = F.pipe(
  	map(noteValueToText),
    join(' '),
    addtoDomElt('output')
);

displayNotes([1,2,3]);