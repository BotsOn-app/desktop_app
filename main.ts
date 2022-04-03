import { BrowserWindow, app } from 'electron';
import { ipcMain } from 'electron/main';
import { Bot } from './src/app/bots';
import * as axios from 'axios'
import * as discordRPC from 'discord-rpc'
import { Extension } from './src/app/extensions';
import * as fs from 'fs';

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 1024,
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

// Create RPC client
const clientId = "960100262914183178"

discordRPC.register(clientId)

const rpc = new discordRPC.Client({ transport: 'ipc' })
const startTimestamp = new Date()

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'Dans le monde des bots',
    state: 'BotsOn',
    startTimestamp,
    largeImageKey: 'logo',
    largeImageText: 'BotsOn - Create Discord Bots',
    // smallImageKey: 'icon du bot',
    // smallImageText: 'Nom du bot',
    instance: false,
    buttons: [
      {
        label: 'Website',
        url: 'https://botson.app'
      },
    ]
  })
})

rpc.login({ clientId }).catch(console.error)

// Global IPC

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
    name: response.data.username,
    avatarURL: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`,
    accent_color: response.data.accent_color,
    token: token,
    extensions: []
  })

  console.log(bot)
  event.sender.send('new-bot-reply', bot)
})

// Get all bots in appdata folder
ipcMain.on('get-bots', (event) => {
  let bots = Bot.getAll()
  event.sender.send('get-bots-reply', bots)
})

// Get specific bot in appdata folder
ipcMain.on('get-bot', (event, id) => {
  let bot = Bot.get(id)
  event.sender.send('get-bot-reply', bot)
})

// Delete specific bot in appdata folder
ipcMain.on('delete-bot', (event, id) => {
  let bot = Bot.delete(id)
  event.sender.send('delete-bot-reply', bot)
})

// get all extensions in specific bot
ipcMain.on('get-extensions-bot', (event, botId) => {
  let bot = Bot.get(botId)
  if (!bot) {
    event.sender.send('get-extensions-bot-reply', false)
    return
  }
  event.sender.send('get-extensions-bot-reply', bot.extensions)
})

// add extension to specific bot in appdata folder
ipcMain.on('add-extension-bot', (event, botId, extension) => {
  let bot = Bot.addExtension(botId, extension)
  event.sender.send('add-extension-bot-reply', bot)
})

// remove extension to specific bot in appdata folder
ipcMain.on('remove-extension-bot', (event, botId, extension) => {
  let bot = Bot.removeExtension(botId, extension)
  event.sender.send('remove-extension-bot-reply', bot)
})

// add extension in appdata folder
ipcMain.on('add-extension', (event, extension) => {
  let bot = Extension.add(extension)
  event.sender.send('add-extension-reply', bot)
})

// remove extension in appdata folder
ipcMain.on('remove-extension', (event, extension) => {
  let bot = Extension.delete(extension)
  event.sender.send('remove-extension-reply', bot)
})
