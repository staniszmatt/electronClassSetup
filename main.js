//Web Content property is in itself a separate module. 
//Web Content represents the content that is loaded in the window
// Modules
const {app, BrowserWindow, webContents} = require('electron') //Required to add in the webContents from electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    x: 100, y: 100, //Just moving window to upper left corner of screen
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools()

  //create a reference to the web content property
  let wc = mainWindow.webContents // Basicity short handing the method call

  // console.log(wc); //The main windows web content
  // console.log(webContents.getAllWebContents()) //This sends the same info in array form

  //Showing the difference between doc full loaded and dom ready
  //This also helps at the exact points content is loaded.
  // wc.on('did-finish-load', ()=>{
  //   console.log("Content fully loaded");
  // })
  // wc.on('dom-ready', ()=>{ // This should happen first since the DOM hasn't fully loaded yet.  
  //   console.log("DOM Ready!");  
  // })

  //This allows more control over new windows that can be opened.
  //Adding preventDefault will stop the window from opening, read the url and then open a new window based off the url, more control
  //Error handing and messaging can be used here as well 
  // wc.on('new-window', (e, url)=>{
  //   console.log(`Creating new window for : ${url}`);
  // })

  //Away to see the users input, key up/down logs
  // wc.on('before-input-event', (e, input) => {
  //   console.log(`event: ${e}`);
  //   console.log(`input: ${input}`);
  //   console.log(`Input Key is ${input.key} and input type is ${input.type}`);
  // })

  //Simple setup to send user login for testing 
  wc.on('login', (e, request, authInfo, callBack)=>{
    console.log("Logging In: ");
    callBack('user', 'passwd')
  })

  //Basic auth test 
  wc.on('did-navigate', (e, url, statusCode, message) => {
    console.log("Event info: ", e);
    console.log(`URL: ${url}, Status Code: ${statusCode}, Message: ${message}`);
  })

  //Listen for window being closed
  mainWindow.on('closed', () => {
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
