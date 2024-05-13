const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  login: (data) => ipcRenderer.invoke('user:login', data),
  enter: (userId) => ipcRenderer.invoke('user:enter', userId),
  exit: (userId) => ipcRenderer.invoke('user:exit', userId),
  quit: () => ipcRenderer.send('quit'),
})
