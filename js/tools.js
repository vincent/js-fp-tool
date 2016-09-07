function loadRemote(path, callback) {
    var fetch = new XMLHttpRequest();
    fetch.open('GET', path);
    fetch.overrideMimeType("text/plain; charset=x-user-defined");
    fetch.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            /* munge response into a binary string */
            var t = this.responseText || "" ;
            var ff = [];
            var mx = t.length;
            var scc= String.fromCharCode;
            for (var z = 0; z < mx; z++) {
                ff[z] = scc(t.charCodeAt(z) & 255);
            }
            callback(ff.join(""));
        }
    }
    fetch.send();
}

var host = '127.0.0.1'; // window.document.location.host.replace(/:.*/, '');
var ws = new WebSocket('ws://' + host + ':4321');

function sendMidi(midi) {
  ws.send(JSON.stringify({type:'file', data:midi }));
}

