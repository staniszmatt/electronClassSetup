// Modules
//A whole API for working with Cookies since electron is a web based platform so 
//cookies are used as part of the data store.
const {app, BrowserWindow, session} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  //Short hand reference for default sessions
  let ses = session.defaultSession;
  //Turning the getter into a function 
  let getCookies = ()=>{
    // The {} means all cookies
    ses.cookies.get({}, (err, cookies)=>{
      console.log("Error: ", err);
      console.log("Cookies!: ", cookies);
    })
  }



  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  // mainWindow.loadFile('index.html')
  
  //Setting up a outside source, Need to wait for content 'did-finish-load'
  mainWindow.loadURL('https://github.com')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', e => {
    getCookies();
  })

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
