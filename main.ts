import { BrowserWindow, app } from 'electron';
import { ipcMain } from 'electron/main';
import { Bot } from './src/app/bots';
import * as axios from 'axios'

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
ipcMain.on('new-bot', async (event, token) => {
  let response = await axios.default.get('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `Bot ${token}`
    }  
  })

  if (response.status !== 200) {
    event.sender.send('new-bot-error', 'Invalid token')
    return
  }

  let bot = Bot.add({
    id: response.data.id,
    token: token,
    extensions: []
  })

  console.log(bot)
  event.sender.send('new-bot-reply', bot)
})

// Get all bots in appdata folder
ipcMain.on('get-bots', (event) => {
  let bots = Bot.getAll()
  event.sender.send('bots', bots)
})

// Get specific bot in appdata folder
ipcMain.on('get-bot', (event, id) => {
  let bot = Bot.get(id)
  event.sender.send('bot', bot)
})

// Delete specific bot in appdata folder
ipcMain.on('delete-bot', (event, id) => {
  let bot = Bot.delete(id)
  event.sender.send('delete-bot', bot)
})

// add extension to specific bot in appdata folder
ipcMain.on('add-extension-bot', (event, botId, extension) => {
  let bot = Bot.addExtension(botId, extension)
  event.sender.send('add-extension-bot', bot)
})

// remove extension to specific bot in appdata folder
ipcMain.on('remove-extension-bot', (event, botId, extension) => {
  let bot = Bot.removeExtension(botId, extension)
  event.sender.send('remove-extension-bot', bot)
})
