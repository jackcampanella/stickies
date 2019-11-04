// Bringing in electron and other modules
const electron = require('electron');
const url = require('url');
const path = require('path');

// Bringing in various objects from electron's library
const {app, BrowserWindow, Menu} = electron;

// Set environment, remove if you wish to persist in development mode
process.env.NODE_ENV = 'production';

// Variables to represent our initial sticky note and additional notes
let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create the main Window, giving it dimensions to look like a sticky note
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400

        //frame: false  -- this removes the default frame, kind of makes it more like a sticky note
           
    });

    // Load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true

    }));

    // Build menu from template defined below
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);
    
});


// Create menu template, when you create a menu in electron it's basically just an array of objects
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Note'
            },
            {
                label: 'Clear Note'
            },
            {
                label: 'Quit',
                // Allowing for use of hotkeys to quit the application, ternary logic to check OS to determine proper standard hotkeys
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }

];

// If on Mac OS, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
            // Note, you can also add an accelerator for hotkeys here
              label: 'Toggle DevTools',
              click(item, focusedWindow){
                  focusedWindow.toggleDevTools();
              }  
            },
            {
                role: 'reload'
            }
        ]

    });
}