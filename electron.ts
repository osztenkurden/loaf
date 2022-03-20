import { app, App, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import * as EventInit from "./modules/EventHandler";
import * as Machine from "./modules/Machine";
import User from "./modules/User";

// import * as Storage from "./storage/storage";

interface IExtApp extends App {
    isQuitting?: boolean;
}
process.env.NODE_ENV = 'production'
const isDev = process.env.DEV === "true";

let tray: Tray | null = null;

const startApp = async () => {
    app.setAppUserModelId("com.bakerysoft.loaf");

    Machine.checkDirectories();

    const win = new BrowserWindow({
        height: 720,
        icon: path.join(__dirname, "assets/icon.png"),
        minHeight: 600,
        minWidth: 400,
        show: false,
        title: "Loaf",
        // transparent:true,
        frame: false,
        webPreferences: {
            backgroundThrottling: false,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
        width: 1280,
    });
    win.on('focus', () => {
        //win.flashFrame(false);
    })
        

    app.on("second-instance", () => {
        win.show();
        win.focus();
    });

    tray = new Tray(path.join(__dirname, "assets/icon.png"));
    const context = Menu.buildFromTemplate([
        {
            click: () => {
                win.show();
            },
            label: "Show",
        },
        {
            click: () => {
                const application: IExtApp = app;
                application.isQuitting = true;
                application.quit();
            },
            label: "Quit Loaf",
        },
    ]);
    tray.setContextMenu(context);
    tray.setToolTip("Loaf");
    tray.on("click", () => {
        win.flashFrame(true);
        win.show();
    });

    app.on("before-quit", () => {
        win.removeAllListeners("close");
        win.close();
    });

    win.on('hide', () => {
        User.window?.send("clearPages");
    })

    win.once("ready-to-show", () => {
        win.show();
    });

    win.setMenuBarVisibility(false);

    win.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/build/index.html`);

    win.on("close", (event) => {
        const application: IExtApp = app;
        if (!application.isQuitting) {
            event.preventDefault();
            win.hide();
        }
        win.flashFrame(true);
        return false;
    });

    EventInit.start(win.webContents);

    /*events.forEach((event) => {
        ipcMain.on(event.name, event.response);
    });*/
};

process.on("uncaughtException", (e) => {
    console.log(e);
});
process.on("unhandledRejection", (e) => {
    console.log(e);
});

app.on("window-all-closed", app.quit);

const lock = app.requestSingleInstanceLock();
if (!lock) {
	app.quit();
} else {
	app.on('ready', startApp);
}

