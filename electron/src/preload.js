const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  login: (data) => ipcRenderer.invoke('user:login', data),
  enter: (token) => ipcRenderer.invoke('user:enter', token),
  exit: (token) => ipcRenderer.invoke('user:exit', token),
  quit: () => ipcRenderer.send('quit'),
})
