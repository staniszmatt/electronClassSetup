// Modules
//By default will bring up a prompt for location to save file
const {app, BrowserWindow, session} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  let ses = session.defaultSession; 

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  ses.on('will-download', (e, downloadItem, webContents)=>{

    console.log('Start of download');
    console.log(downloadItem.getTotalBytes());
    console.log('File Name: ', downloadItem.getFilename());
    

    let downloadName = ('File Name: ', downloadItem.getFilename());
    let downloadSize = ('Total Bytes: ', downloadItem.getTotalBytes());

    //getting desktop path to save to the desktop 
    downloadItem.setSavePath(app.getPath('desktop') + `/${downloadName}`); 

    downloadItem.on('updated', (e, state)=>{

      let received = downloadItem.getReceivedBytes();

      if(state === 'progressing' && received){
        let progress = Math.round((received/downloadSize)*100);
        console.log(progress); 
        webContents.executeJavaScript(`window.progress.value = ${progress }`)
      }

    })


    // console.log('Event info: ', e);
    // console.log('Web Contents: ', webContents);
    
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
