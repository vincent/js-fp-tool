document.getElementById('sandbox').innerHTML = F.keyboard();


function press(key, state) {
  document.getElementById('k'+key).classList.toggle("pressed", state);
}

// TODO refactor  pour inclure un reduce sur l index

function next(tab, i) {
  if (i >= tab.length) return;


  press(tab[i].noteNumber, F.isNoteOn(tab[i]));

  if (tab[i+1]) {
    setTimeout(function () { next(tab, i+1); }, tab[i+1].deltaTime*3);
  }
}

var track = F.simpleTrack().filter(F.isNote);

next(track, 0);
