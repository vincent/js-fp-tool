const electron = require('electron');
const defaultMenu = require('electron-default-menu');
const { Menu, shell, app } = electron;
const menu = defaultMenu(app, shell);
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const exercicesDirectory = __dirname + '/../exercices';

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

  var exercices = [];

  fs.readdir(exercicesDirectory, function (err, files) {

    files.sort(sortNaturally).forEach(function (f) {
      exercices.push({
        label: _.capitalize(path.basename(f, '.js')),
        click: (item, focusedWindow) => {
          var code  = fs.readFileSync(exercicesDirectory + '/' + f).toString();
          var lines = code.split('\n').length;
          code += lines > 20 ? '' : _.fill(Array(2 + (20 - lines)), '').join('\n');
          focusedWindow.webContents.send('load-exercice', { text:code })
        }
      })
    })

    menu.push({
      label: 'Exercices',
      submenu: exercices
    });
   
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  })
};

function sortNaturally(a, b) {
  return +/\d+/.exec(a)[0] - +/\d+/.exec(b)[0];
};