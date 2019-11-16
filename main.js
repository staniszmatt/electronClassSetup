// Modules
//Adding dialog from electron
const {app, BrowserWindow, dialog} = require('electron')

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
  mainWindow.webContents.openDevTools();
  //when the dom in main session window is finished loading
  mainWindow.webContents.on('did-finish-load', ()=>{

    //creat an open dialog to load 1 or multiple files at one time
    //All methods for dialog is blocking, meaning if content tries to load after main window loads and before 
    //loadfile, the window will hang until user closes the dialog. 

    //Using mainWindow will open dialog window inside it as a child window and is optional 
    //Without calling mainWindow, then the child window can move outside mainWindow 
    dialog.showOpenDialog({
      buttonLabel: 'Select a photo',
      defaultPath: app.getPath('home'), //Can use desktop instead if desired  
      //createDirectory is a mac property, openFile sets default of selecting only one file, openDirectory to allow us to open a directory
      properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    }, filePaths=>{
      console.log(filePaths);  
    });
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
