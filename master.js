const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const currentIP = require('./lib/ip')();
console.log('current IP = ', currentIP);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/master.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 4321 });

wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(data);
  });
};


var midiFiles;

function resetMidiFies () {
  midiFiles = [];
  wss.broadcast('reset');
}

function mixFiles (callback) {
  if (!midiFiles.length) return;

  var mix = midiFiles.shift();

  console.log('%o files to mix', midiFiles.length);
  midiFiles.forEach(function (file) {
    file.tracks.forEach(function (t) {
      mix.tracks.push(t);
    });
  });

  callback(null, mix);
}

function play (midi) {
  mixFiles(function (error, mix) {
    console.log('final mix = %o', mix);
    wss.broadcast(JSON.stringify({ type:'play', data:mix }));
  })
}

wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify({ type:'ip', data:currentIP }));
  ws.on('message', function (message) {
    console.log(message);
    var event = JSON.parse(message);
    console.log(event);

    switch (event.type) {

      case 'file':
        midiFiles.push(event.data)
        break;

      case 'play':
        play();
        break;

    }

  });
});

resetMidiFies();
