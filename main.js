// Modules
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, 
    height: 800,
    minWidth: 300,
    minHeight: 150,
    webPreferences: { nodeIntegration: true }
  })

  secondWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    minWidth: 300,
    minHeight: 150,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  secondWindow.loadFile('index.html');

  //Event setup for windows
  mainWindow.on('focus', ()=>{
    console.log('Main Window Focused.');
  })
  secondWindow.on('focus', ()=>{
    console.log('Second Window Focused.');
  })
  //Same as the individual focus but for any window
  app.on('browser-window-focus', ()=>{
    console.log('App window focused.');
  })

  console.log(BrowserWindow.getAllWindows())
  //Display the window id 
  console.log("Main Window Id is :", mainWindow.id)

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools()
  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
  secondWindow.on('closed',  () => {
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
