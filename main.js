// Modules
const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state'); //Bring in window state 

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  //create a window state manager
  let winState = windowStateKeeper({
    defaultHeight: 1000,
    defaultWidth: 1000
  })

  mainWindow = new BrowserWindow({
    height: winState.height, //Using winstates default height and width
    width: winState.width,
    x: winState.x,  //Position of window, doesn't need defuat setup in winState as it will defautl to winodw browser center
    y: winState.y,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  
  //Calling out which window to store state
  winState.manage(mainWindow)

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
