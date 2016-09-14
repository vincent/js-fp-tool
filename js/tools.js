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

function playMidi(midi) {
  var synth = Synth(44100);
  var replayer = Replayer(midiFile, synth);
  AudioPlayer(replayer);
}

function simpleMidi() {
    return {
      header:{
        formatType:1,
        trackCount:7,
        ticksPerBeat:192
      },
      tracks: [
        [
          {deltaTime:0,   channel:0, type:"channel","noteNumber":73, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":73, velocity:64},
          {deltaTime:50,  channel:0, type:"channel","noteNumber":72, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":72, velocity:64},
          {deltaTime:2,   channel:0, type:"channel","noteNumber":73, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":73, velocity:64},
          {deltaTime:50,  channel:0, type:"channel","noteNumber":76, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":76, velocity:64},
          {deltaTime:2,   channel:0, type:"channel","noteNumber":75, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":75, velocity:64},
          {deltaTime:50,  channel:0, type:"channel","noteNumber":76, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":76, velocity:64},
          {deltaTime:2,   channel:0, type:"channel","noteNumber":81, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":81, velocity:64},
          {deltaTime:50,  channel:0, type:"channel","noteNumber":73, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":73, velocity:64},
          {deltaTime:2,   channel:0, type:"channel","noteNumber":74, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":74, velocity:64},
          {deltaTime:242, channel:0, type:"channel","noteNumber":86, velocity:110, subtype:"noteOn"},
          {deltaTime:46,  channel:0, type:"channel", subtype:"noteOff","noteNumber":86, velocity:64},
          {deltaTime:0,   type:"meta", subtype:"endOfTrack"}
        ]
      ]
    };
}

function simpleTrack() {
    return simpleMidi().tracks[0];
}