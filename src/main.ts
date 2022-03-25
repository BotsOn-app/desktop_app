import { app, BrowserWindow } from "electron"

let win = new BrowserWindow({
    width: 800,
    height: 600,
})

win.loadFile("../static/index.html")