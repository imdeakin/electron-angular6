import {app, BrowserWindow, screen} from 'electron';
import {enableLiveReload} from 'electron-compile';

const path = require('path');
const url = require('url');
const angularJSON = require('../angular.json');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;
const serve = process.env.NODE_ENV === 'serve';
const isDevMode = process.execPath.match(/[\\/]electron/);
const cwd = process.cwd();

if (isDevMode) {
  enableLiveReload();
}

const getOutputPath = () => {
  const project = angularJSON.defaultProject;
  return angularJSON.projects[project].architect.build.options.outputPath;
};

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (serve) {
    require('electron-reload')(cwd, {
      electron: require(`${cwd}/node_modules/electron`)
    });
    mainWindow.loadURL('http://localhost:4200');
  } else {
    const outputPath = getOutputPath();
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname,  `${outputPath}/index.html`),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};
try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
