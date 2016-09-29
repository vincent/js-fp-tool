require('fs').readFile(__dirname + '/../doc/Functional.html', function (error, data) {
  var api     = data.toString();
  var apiEl   = document.getElementById('apidoc');
  var toggleBtn = document.getElementById('showdoc');
  var article = api.slice( api.indexOf('<article>'), api.indexOf('</article>') );
  apiEl.innerHTML = article;
  setTimeout(function(){
    toggleBtn.addEventListener('click', function () {
      apiEl.classList.toggle('open');
    })
  }, 100)
})
