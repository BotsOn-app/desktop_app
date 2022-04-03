import { contextBridge, ipcRenderer } from "electron";
import { BotInterfaces } from './src/app/bots';

contextBridge.exposeInMainWorld("api", {
    on : (event, callback) => {
        ipcRenderer.on(event, (event, ...args) => {
            callback(...args)
        })
    },
    send : (event, ...args) => {
        ipcRenderer.send(event, ...args)
    },
    newBot: (options: BotInterfaces) => {
        ipcRenderer.send("new-bot", options)
    },
    getAllBot: () => {
        ipcRenderer.send("get-bots")
    },
    getBot: (id: string) => {
        ipcRenderer.send("get-bot", id)
    },
    deleteBot: (id: string) => {
        ipcRenderer.send("delete-bot", id)
    },
    addExtensionBot: (botId: string, extension: string) => {
        ipcRenderer.send("add-extension-bot", botId, extension)
    }
})