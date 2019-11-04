// Modules
// Adding session from electron allows access to the main default session
const {app, BrowserWindow, session} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondWindow


// Create a new BrowserWindow when `app` is ready
function createWindow () {

  //Create a custom session, allows this data do be synced with multiple devices for one good use!
  let custSession = session.fromPartition('part1')

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })
  secondWindow = new BrowserWindow({
    width: 800, height: 600,
    x: 100, y: 100, 
    webPreferences: { 
      nodeIntegration: true,
      session: custSession
    }
  })

  //Pull session info
  let ses = mainWindow.webContents.session
  let ses2 = secondWindow.webContents.session
  let defses = session.defaultSession


  console.log('Is first session and second session the same? : ',Object.is(ses2, ses)); // Gives us an object {}  
  console.log('Is session and default session the same? : ',Object.is(ses, defses)); //Object.is() to check if two variables reference the same object
  console.log('Is custom session and the session the same? : ',Object.is(ses, custSession)); 

  // console.log('session data: ', ses);  

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  secondWindow.loadFile('index.html');
  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();
  secondWindow.webContents.openDevTools();

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
