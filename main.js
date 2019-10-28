// Modules
const {app, BrowserWindow} = require('electron')
const colors = require('colors'); //Setup like react when adding processes or functions to others only this is backend api's. 
const bcrypt = require('bcrypt');

bcrypt.hash('myPlaintextPassword', 10, function(err, hash) {
  // Store hash in your password DB.
  console.log(hash);
  console.log("Errors ", err);
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

console.log(colors.rainbow("This is the colors process addition for backend."))
// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1600, height: 800,
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
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
