
var names = F.simpleTrack().filter(F.isNoteOn).map(F.eventToNoteName);

function groupBy(arr, c) {
  var r = [];
  var a = [].concat(arr);
  do {
  r.push(a.splice(0, c));
  } while (a.length);
  return r;
}

var sheet = F.musicSheet();

groupBy(names, 4)
  .forEach(function(group){
    sheet.addNotes(group);
  });

sheet.draw();
