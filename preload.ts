import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    newBot: (token) => {
        ipcRenderer.send("new-bot", token)
    }
})