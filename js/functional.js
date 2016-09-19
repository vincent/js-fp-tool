/**
 * Librairie fonctionnelle.
 * @namespace Functional
 */
var Functional = { };

/**
 * Retourne un MIDI simple.
 * @return {Object} MIDI
 */
Functional.simpleMidi = function() {
  return {
    header:{
      formatType:1,
      trackCount:1,
      ticksPerBeat:192
    },
    tracks: [
      [
        {deltaTime:0,   channel:0, type:"channel", noteNumber:73, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:73, velocity:64,  subtype:"noteOff"},
        {deltaTime:50,  channel:0, type:"channel", noteNumber:72, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:72, velocity:64,  subtype:"noteOff"},
        {deltaTime:2,   channel:0, type:"channel", noteNumber:73, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:73, velocity:64,  subtype:"noteOff"},
        {deltaTime:50,  channel:0, type:"channel", noteNumber:76, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:76, velocity:64,  subtype:"noteOff"},
        {deltaTime:2,   channel:0, type:"channel", noteNumber:75, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:75, velocity:64,  subtype:"noteOff"},
        {deltaTime:50,  channel:0, type:"channel", noteNumber:76, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:76, velocity:64,  subtype:"noteOff"},
        {deltaTime:2,   channel:0, type:"channel", noteNumber:81, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:81, velocity:64,  subtype:"noteOff"},
        {deltaTime:50,  channel:0, type:"channel", noteNumber:73, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:73, velocity:64,  subtype:"noteOff"},
        {deltaTime:2,   channel:0, type:"channel", noteNumber:74, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:74, velocity:64,  subtype:"noteOff"},
        {deltaTime:242, channel:0, type:"channel", noteNumber:86, velocity:110, subtype:"noteOn" },
        {deltaTime:46,  channel:0, type:"channel", noteNumber:86, velocity:64,  subtype:"noteOff"},
        {deltaTime:0, type:"meta", subtype:"endOfTrack"}
      ]
    ]
  };
};

/**
 * Retourne une piste simple.
 * @return {Array} Piste MIDI
 */
Functional.simpleTrack = function () {
  return F.simpleMidi().tracks[0];
};

/**
 * Retourne True si cet item est de type noteOn ou noteOff
 * @return {boolean} noteOn ou noteOff
 */
Functional.isNote = function (event) {
  return event.subtype.match(/^note/);
};

/**
 * Retourne True si cet item est de type noteOn
 * @return {boolean} noteOn
 */
Functional.isNoteOn = function (event) {
  return event.subtype == 'noteOn';
};

/**
 * Retourne True si cet item est de type noteOff
 * @return {boolean} noteOff
 */
Functional.isNoteOff = function (event) {
  return event.subtype == 'noteOff';
};

/**
 * Retourne un clone de l'objet.
 * @return {Object} clone
 */
Functional.clone = function (o) {
  return Functional.extend({}, o);
};

/**
 * Retourne un clone de l'objet, avec les propriétés de chaque objet passé.
 * @return {Object} clone
 */
Functional.extend = function () {
  return extendDeep.apply(null, [{}].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Récupère un fichier MIDI.
 * @param {String}         path     URL
 * @param {Function}       callback Callback de la forme function(error, midi)
 * @return {XMLHttpRequest} Requete AJAX
 */
Functional.loadRemote = function(path, callback) {
  var fetch = new XMLHttpRequest();
  fetch.open('GET', path);
  fetch.overrideMimeType("text/plain; charset=x-user-defined");
  fetch.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        /* munge response into a binary string */
        var t = this.responseText || "" ;
        var ff = [];
        var mx = t.length;
        var scc= String.fromCharCode;
        for (var z = 0; z < mx; z++) {
          ff[z] = scc(t.charCodeAt(z) & 255);
        }
        callback(null, MidiFile(ff.join("")));
      } else {
        callback(new Error('cannot load file'));
      }
    }
  }
  fetch.send();
};

Functional.loadRemotePromised = function (path) {
  var deferred = Q.defer();
  Functional.loadRemote(path, function (error, midi) {
    return error ? 
      deferred.reject(new Error(error)) :
      deferred.resolve(midi);
  });
  return deferred.promise;
};

/**
 * Joue une structure MIDI.
 * @param {Object} midi Objet MIDI
 */
Functional.playMidi = function(midi) {
  var synth = Synth(44100);
  var replayer = Replayer(midi, synth);
  AudioPlayer(replayer);
};

/**
 * Retourne un clavier en HTML.
 *  - les touches ont un id="kXX" où XX est une note
 *  - les touches peuvent prendre une classe 'pressed'
 * @return {String} HTML
 */
Functional.keyboard = function () {
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
};

/**
 * Crée un WebSocket et retourne une Promise.
 * @param {String} host Adresse ou IP de la machine cible
 * @return {Promise} Promesse
 */
Functional.createWebSocket = function (host) {
  var deferred = Q.defer();

  var ws = new WebSocket('ws://' + host + ':4321');

  ws.onerror = function (error) {
    deferred.reject(new Error(error));
  };

  ws.onopen = function () {
    deferred.resolve(ws);
  }

  return deferred.promise;
};


window.F = Functional;

