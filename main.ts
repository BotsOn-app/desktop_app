import { BrowserWindow, app, ipcMain, ipcRenderer } from 'electron';

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
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
