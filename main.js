// Modules
const {app, BrowserWindow} = require('electron');

console.log('App is ready :' + app.isReady()); 
setTimeout(() => {
  console.log('App is ready :' + app.isReady());
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
};

// app.on('browser-window-blur', e => {
//   console.log('App Unfocused.');
// });

// app.on('browser-window-focus', e => {
//   console.log('App focus.');
// });

// app.on('browser-window-blur', e => {
//   setTimeout(() => { //Can be rewritten as setTimeout(apt.quit, 3000)
//     app.quit();
//   }, 3000);
// });

// app.on('before-quit', e => {
//   console.log('Prevent App from quitting.');
//   e.preventDefault()
// })

// Electron `app` is ready
app.on('ready', () => {
  console.log('App is ready!');
  createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
