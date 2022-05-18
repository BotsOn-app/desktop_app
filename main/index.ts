import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const isDev = (process.env.ELECTRON_IS_DEV === 'true');
//console.log(typeof isDev);


// tslint:disable-next-line: typedef
function createWindow() {
  // Create the browser window.
  app.name = 'Sveltron'
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      allowRunningInsecureContent: (isDev) ? true : false
    },

  });

  if (isDev) {
    // and load the angular url of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    console.log('development mode');
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'renderer/build/index.html'));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    console.log('production mode');
  }


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', () =>  {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) { createWindow(); }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.