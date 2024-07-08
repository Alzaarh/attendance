const path = require('node:path')

const { app, BrowserWindow, ipcMain } = require('electron')

// const { createDatabase } = require('./helpers/database')
const { login, enter, exit, startLeave, endLeave } = require('./handlers/user')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
  })
  window.loadFile('views/login.html')
}

app
  .whenReady()
  .then(() => {
    ipcMain.handle('user:login', login)
    ipcMain.handle('user:enter', enter)
    ipcMain.handle('user:exit', exit)
    ipcMain.handle('user:startLeave', startLeave)
    ipcMain.handle('user:endLeave', endLeave)
    ipcMain.on('quit', () =>
      setTimeout(() => {
        app.exit()
      }, 1000)
    )
    createWindow()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
