const electron = require('electron');
const defaultMenu = require('electron-default-menu');
const { Menu, shell, app } = electron;
const menu = defaultMenu(app, shell);
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const exercicesDirectory = __dirname + '/../exercices';
const solutionsDirectory = __dirname + '/../exercices_resolus';

module.exports = function (mainWindow) {

  menu.unshift({
    label: 'File',
    submenu: [{
      label: 'Exit',
      click: (item, focusedWindow) => {
        focusedWindow.close();
      }
    }]
  });

  var exercices = [], solutions = [];

  fs.readdir(exercicesDirectory, function (err, files) {

    files.sort(sortNaturally)
         .forEach(function (f) {
            var fname = _.capitalize(path.basename(f, '.js'));
            exercices.push({ label:fname, click:fileLoader(exercicesDirectory + '/' + f) });
            solutions.push({ label:fname, click:fileLoader(solutionsDirectory + '/' + f) });
          })

    menu.push({
      label: 'Exercices',
      submenu: exercices
    });

    var help = menu
      .find(function (m) {
        return m.label === 'Help'
      })
      .submenu.push({
        label: 'Solutions',
        submenu: solutions
      });
   
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  })
};

function sortNaturally (a, b) {
  return +/\d+/.exec(a)[0] - +/\d+/.exec(b)[0];
};

function fileLoader (path) {
  return function (item, focusedWindow) {
    var code  = fs.readFileSync(path).toString();
    var lines = code.split('\n').length;
    code += lines > 20 ? '' : _.fill(Array(2 + (20 - lines)), '').join('\n');
    focusedWindow.webContents.send('load-exercice', { text:code })
  };
}