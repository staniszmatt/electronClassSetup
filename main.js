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
    // adialog.showOpenDialog({
    //   buttonLabel: 'Select a photo',
    //   defaultPath: app.getPath('home'), //Can use desktop instead if desired  
    //   //createDirectory is a mac property, openFile sets default of selecting only one file, openDirectory to allow us to open a directory
    //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    // }, filePaths=>{
    //   console.log(filePaths);  
    // });

    //save dialog, empty object is an options object, this only shows how create the path, separate method for writing data
    // dialog.showSaveDialog({}, fileName=>{
    //   console.log(fileName);
    // })

    //message box dialog, example prompting for a choice
    const answers = ['Yes', 'No', 'Maybe']; //Order Does Matter, 1st as main, 2nd as secondary, then the rest as additional options. 
    //
    dialog.showMessageBox({
      title: 'Message Box',
      message: 'Please select an option',
      detail: 'Message details.', 
      buttons: answers //this provides a range of button options other than whats listed, needs to be created in array of options
    }, response=>{//callback with response
      console.log(`User Selected: ${answers[response]}`)
    }) 
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
