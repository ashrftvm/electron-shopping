const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

//set env - dev tools will go away
process.env.NODE_ENV = "production";

let mainWindow;
let addWindow;

app.on("ready", function() {
  //create window
  mainWindow = new BrowserWindow({
    //dont use this in production if its loading any other remote
    webPreferences: { nodeIntegration: true }
  });
  //load html into window
  mainWindow.loadFile("mainWindow.html");

  //quit app when closed
  mainWindow.on("closed", function() {
    app.quit();
  });

  //load Menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

//handle add window creation
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 400,
    height: 250,
    title: "Add Shopping List Item",
    //dont use this in production if its loading any other remote
    webPreferences: { nodeIntegration: true }
  });

  addWindow.loadFile("addWindow.html");
  //garbage collection handle
  addWindow.on("close", function() {
    addWindow = null;
  });
}

//catch value from add item
ipcMain.on("item:add", (e, item) => {
  mainWindow.webContents.send("item:add", item);
  addWindow.close();
});

//create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Items",
        click() {
          mainWindow.webContents.send("item:clear");
        }
      },
      {
        type: "separator"
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

//if mac add empty object
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({ label: "" });
}

//add dev tools item if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
