require('fs').readFile(__dirname + '/../doc/Functional.html', function (error, data) {
  var api = data.toString();
  var art = api.slice( api.indexOf('<article>'), api.indexOf('</article>') );
  document.getElementById('apidoc').innerHTML = art;
})
