import { BrowserWindow, app } from 'electron';
import { ipcMain } from 'electron/main';
import * as fs from 'fs';
import { BotInterfaces } from './src/interfaces/BotsInterfaces';

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
  let appData = app.getPath("userData")
  let bot = {
    token: token,
    extensions: []
  }
  // verif bots.json exist
  if (!fs.existsSync(appData + "\\bots.json")) {
    fs.writeFileSync(appData + "\\bots.json", JSON.stringify([bot]))
  }

  // verif bot not already exist
  let bots: BotInterfaces[] = require(appData + "/bots.json")
  let tokens: string[] = bots.map(bot => bot.token)
 
  if (tokens.includes(token)) {
    event.sender.send('bot-already-exist')
    return console.log("bot already exist")
  }

  bots.push(bot)
  fs.writeFileSync(appData + "/bots.json", JSON.stringify(bots))
  event.sender.send('bot-added', bot)
})

// Get all bots in appdata folder
ipcMain.on('get-bots', (event) => {
  let appData = app.getPath("userData")
  let bots = require(appData + "/bots.json")
  // event.sender.send('bots-loaded', bots)
})


