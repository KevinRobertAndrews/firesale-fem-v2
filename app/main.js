const fs = require('fs');
const { app, BrowserWindow, dialog } = require('electron');

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

exports.getFileFromUser = () => {
    // Use a native dialog to open a file
    const files = dialog.showOpenDialog({
        properties: ['openFile'],
        buttonLabel: 'Unveil',
        title: 'Open Firesale Document',
        filters: [
            { name: 'Markdown Files', extensions: ['md', 'mdown', 'markdown'] },
            { name: 'Text Files', extensions: ['txt', 'text'] },
        ],
    });

    // If the user cancels the dialog, then files will be undefined
    if (!files) return;

    // Show the contents of the file in the console
    const [file] = files;
    openFile(file);
};

const openFile = (file) => {
    const content = fs.readFileSync(file, { encoding: 'utf-8' });
    mainWindow.webContents.send('file-opened', file, content);
};
