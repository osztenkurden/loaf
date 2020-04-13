import { app, App, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
// import * as Storage from "./storage/storage";

const isDev = process.env.DEV === "true";

const startApp = async () => {
    app.setAppUserModelId("com.bakerysoft.loaf");


    const win = new BrowserWindow({
        icon: path.join(__dirname, "assets/icon.png"),
        fullscreen:true,
        frame: false,
        focusable:true,
        show: false,
        title: "Loaf Media Viewer",
        webPreferences: {
            backgroundThrottling: false,
            // preload: __dirname + "/preload.js",
            nodeIntegration: true,
        },
    });

    app.on("before-quit", () => {
        win.removeAllListeners("close");
        win.close();
    });

    win.once("ready-to-show", win.show);

    win.setMenuBarVisibility(false);

    win.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/build/index.html`);

    /*events.forEach((event) => {
        ipcMain.on(event.name, event.response);
    });*/
};

app.on("window-all-closed", app.quit);

app.on("ready", startApp);
