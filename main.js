const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on("ready", function() {
  //create window
  mainWindow = new BrowserWindow({});
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
    title: "Add Shopping List Item"
  });

  addWindow.loadFile("addWindow.html");
  //garbage collection handle
  addWindow.on("close", function() {
    addWindow = null;
  });
}

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
        label: "Clear Items"
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
