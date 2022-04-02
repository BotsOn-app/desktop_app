import { BrowserWindow, app } from 'electron';
import { ipcMain } from 'electron/main';
import * as fs from 'fs';

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '\\preload.js'
    }
  })

  win.loadFile('build/index.html')
}

const createLoginWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })

    win.loadFile('build/login.html')
}

app.whenReady().then(() => {
    createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Add e new discord bot in appdata folder for save the token and extensions
ipcMain.on('new-bot', (event, token) => {
  console.log(token)
  let appData = app.getPath("userData")
  console.log(appData)
  let bot = {
    token: token,
    extensions: []
  }
  // verif bots.json exist
  if (!fs.existsSync(appData + "\\bots.json")) {
    fs.writeFileSync(appData + "\\bots.json", JSON.stringify([bot]))
  }

  let bots = require(appData + "/bots.json")
  bots.push(bot)
  fs.writeFileSync(appData + "/bots.json", JSON.stringify(bots))
  // event.sender.send('bot-added', bot)
})

// Get all bots in appdata folder
ipcMain.on('get-bots', (event) => {
  let appData = app.getPath("userData")
  let bots = require(appData + "/bots.json")
  // event.sender.send('bots-loaded', bots)
})
