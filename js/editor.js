(function() {

// Base template
var base_tpl = [
  "<!doctype html>",
  "<html>",
    "<head>",
    "<meta charset=\"utf-8\">",
    "<script src=\"js/simplewebsocket.min.js\"></script>",
    "<script src=\"js/vexflow-min.js\"></script>",
    "<script src=\"js/q.js\"></script>",
    "<script src=\"js/stream.js\"></script>",
    "<script src=\"js/midifile.js\"></script>",
    "<script src=\"js/replayer.js\"></script>",
    "<script src=\"js/synth.js\"></script>",
    "<script src=\"js/audio.js\"></script>",
    "<script src=\"js/tools.js\"></script>",
    "</head>",
    "<body>",
    '<section id="sandbox"></section>',
    "</body>",
  "</html>"
].join('\n');

var prepareSource = function() {
  var js  = js_editor.getValue(),
      src = '' + base_tpl;

  // Javascript
  js = '<script>' + js + '<\/script>';
  src = src.replace('</body>', js + '</body>');

  return src;
};

var run = function() {
  var source = prepareSource();

  // TODO: Create a new one ?
  var iframe = document.querySelector('#output iframe'),
      iframe_doc = iframe.contentDocument;

  iframe_doc.open();
  iframe_doc.write(source);
  iframe_doc.close();
};

// JAVASCRIPT EDITOR
var js_box = document.querySelector('#js textarea');
var js_editor = CodeMirror.fromTextArea(js_box, {
  gutter: true,
  lineNumbers: true,
  mode: 'javascript',
  onChange: function () {
    run();
  }
});

js_editor.on("change", function(js_editor, change) {
  localStorage.setItem('editor', js_editor.getValue());
});

var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('load-exercice', function (event, data) {
  js_editor.setValue(data.text.toString());
});

document.querySelector('#run').addEventListener('click', run);

var saved;
if (saved = localStorage.getItem('editor')) {
  js_editor.setValue(saved);
}

}());