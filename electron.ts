import { fork } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import * as EventInit from "./modules/EventHandler";
import * as Machine from "./modules/Machine";
// import * as Storage from "./storage/storage";

const isDev = process.env.DEV === "true";

const startApp = async () => {
    Machine.checkDirectories();

    const win = new BrowserWindow({
        height: 720,
        icon: path.join(__dirname, "assets/icon.png"),
        minHeight: 600,
        minWidth: 400,
        show: false,
        title: "Loaf Messenger",
        webPreferences: {
            backgroundThrottling: false,
            preload: __dirname + "/preload.js",
        },
        width: 1280,
    });

    app.on("before-quit", () => {
        win.removeAllListeners("close");
        win.close();
    });

    win.once("ready-to-show", win.show);

    win.setMenuBarVisibility(false);

    win.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/build/index.html`);

    win.on("close", app.quit);

    EventInit.start();

    /*events.forEach((event) => {
        ipcMain.on(event.name, event.response);
    });*/
};

app.on("window-all-closed", app.quit);

app.on("ready", startApp);
