// Modules
//Need to add menu and menuItems from electron, Both are classes so will start with capital letters 
const {app, BrowserWindow, Menu, MenuItem} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

//Creating a menu 
let mainMenu = new Menu()
//Menu Items, takes an object of options that you choose from
let menuItem1 = new MenuItem({
  label: 'Electron' 
})

//Need to add the menuItem to the menu with append
mainMenu.append(menuItem1)

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  //Using mainMenu as our main menu, needs loaded when app is fully ready here
  Menu.setApplicationMenu(mainMenu)


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
