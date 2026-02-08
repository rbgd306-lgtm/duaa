const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.png'),
  });

  win.loadFile('index.html');
  win.setMenuBarVisibility(false); // hide menu
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) createWindow();
});
