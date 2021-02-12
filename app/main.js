const { app, BrowserWindow } = require('electron');

// Declare main window in global scope so it doesn't get garbage collected
let mainWindow = null;

// When the app is ready, load the main browser window
app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, height: 800, show: false });
    mainWindow.loadFile(`${__dirname}/index.html`);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
});

console.log('Starting up...');
