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
    //Adding cookie1 will only pull that cookie
    ses.cookies.get({name:  'cookie1'}, (err, cookies)=>{
      console.log("Error: ", err);
      console.log("Cookies!: ", cookies);
    })
  }



  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  
  //Setting up a outside source, Need to wait for content 'did-finish-load'
  // mainWindow.loadURL('https://github.com')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  //creating own cookie
  //with session set to true and no expiration date, the cookie is only good for this current session instance
  //and isn't stored in the sessions object on the disk.
  // let cookie = {
  //   url: 'https://myappdomain.com',
  //   name: 'cookie1',
  //   value: 'electron',
  //   expirationDate: 1636247367
  // }
 
  //setting the creating cookie in the default session
  // ses.cookies.set(cookie, err => {
  //   console.log('Cookie set ');
  //   console.log('error ', err);
  //   getCookies();
  // })

  ses.cookies.remove('https://myappdomain.com', 'cookie1', err =>{
    console.log('error ', err);
    getCookies()
  })

  // mainWindow.webContents.on('did-finish-load', e => {
  //   getCookies();
  // })

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
