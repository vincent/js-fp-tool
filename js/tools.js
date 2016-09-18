
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
  var replayer = Replayer(midi, synth);
  AudioPlayer(replayer);
}

function simpleMidi() {
    return {
      header:{
        formatType:1,
        trackCount:1,
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

function keyboard () {
  return [
    '<style>',
      '#keybox {width:910px; margin-left: -7px; text-align: center;}',
      '#blackkeys { position: absolute; z-index: 2; padding-left: 10px; margin-left: 41px; width:806px; height: 0px;}',
      '.key { display:inline-block; }',
      '.black { background: black; width: 40px; height: 150px; margin: 0px 11px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; }',
      '.spacer { display:inline-block; width: 62px; height: 0; }',
      '.white { background: white; width: 60px; height: 250px; border: 1px solid black; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; }',
      '.pressed { background: gray }',
    '</style>',

    '<div id="keybox">',
      '<div id="blackkeys">',
        '<span id="k61" class="black key"></span>',
        '<span id="k63" class="black key"></span>',
        '<span class="spacer"></span>',
        '<span id="k66" class="black key"></span>',
        '<span id="k68" class="black key"></span>',
        '<span id="k70" class="black key"></span>',
        '<span class="spacer"></span>',
        '<span id="k73" class="black key"></span>',
        '<span id="k75" class="black key"></span>',
        '<span class="spacer"></span>',
        '<span id="k78" class="black key"></span>',
        '<span id="k80" class="black key"></span>',
        '<span id="k82" class="black key"></span>',
      '</div>',
      '<span id="k60" class="white key"></span>',
      '<span id="k62" class="white key"></span>',
      '<span id="k64" class="white key"></span>',
      '<span id="k65" class="white key"></span>',
      '<span id="k67" class="white key"></span>',
      '<span id="k69" class="white key"></span>',
      '<span id="k71" class="white key"></span>',
      '<span id="k72" class="white key"></span>',
      '<span id="k74" class="white key"></span>',
      '<span id="k76" class="white key"></span>',
      '<span id="k77" class="white key"></span>',
      '<span id="k79" class="white key"></span>',
      '<span id="k81" class="white key"></span>',
      '<span id="k83" class="white key"></span>',
    '</div>'
  ].join('');
}

