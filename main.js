// Modules
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true } //web configuration options for web contents
  })

  secondaryWindow = new BrowserWindow({
    width: 600, height: 300,
    webPreferences: { nodeIntegration: true }, //web configuration options for web contents
    parent: mainWindow, // This forces child window to always be above main and moves with parent window and close parent will close child
    modal: true, // Sets child inside parent and must complete child to get back to parent 
    show: false
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html') //Correct way to load the index file, the current documentation has outdated setup
  secondaryWindow.loadFile('secondary.html')

  setTimeout( () => {
    secondaryWindow.show();
    setTimeout(()=>{
      secondaryWindow.close();//Can use .hide to hide instead 
      secondaryWindow = null;
    }, 3000)
  }, 2000)

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools() //Should be used only for development

  // Listen for window being closed
  mainWindow.on('closed',  () => { //event listener 
    mainWindow = null //when closed set the mainWindow to Null.
  })
  secondaryWindow.on('closed',  () => { //event listener 
    mainWindow = null //when closed set the mainWindow to Null.
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
