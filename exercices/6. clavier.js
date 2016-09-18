document.getElementById('sandbox').innerHTML = F.keyboard();


function press(key, state) {
  document.getElementById('k'+key).classList[(state) ? "add": "remove"]("pressed");
}

// TODO refactor  pour inclure un reduce sur l index

function next(tab, i) {
  if (i >= tab.length) return;

 
  press(tab[i].noteNumber, tab[i].subtype == 'noteOn');
  
  if (tab[i+1] !== undefined) {
    setTimeout(function () { next(tab, i+1); }, tab[i+1].deltaTime*3);
  }
}

var track = F.simpleTrack().filter(function(n) {return n.subtype.match(/note/);});

next(track, 0);
