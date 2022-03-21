"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const EventInit = __importStar(require("./modules/EventHandler"));
const Machine = __importStar(require("./modules/Machine"));
const User_1 = __importDefault(require("./modules/User"));
process.env.NODE_ENV = 'production';
const isDev = process.env.DEV === "true";
let tray = null;
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    electron_1.app.setAppUserModelId("com.bakerysoft.loaf");
    Machine.checkDirectories();
    const win = new electron_1.BrowserWindow({
        height: 720,
        icon: path_1.default.join(__dirname, "assets/icon.png"),
        minHeight: 600,
        minWidth: 400,
        show: false,
        title: "Loaf",
        // transparent:true,
        frame: false,
        webPreferences: {
            backgroundThrottling: false,
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            webSecurity: false
        },
        width: 1280,
    });
    win.on('focus', () => {
        //win.flashFrame(false);
    });
    electron_1.app.on("second-instance", () => {
        win.show();
        win.focus();
    });
    tray = new electron_1.Tray(path_1.default.join(__dirname, "assets/icon.png"));
    const context = electron_1.Menu.buildFromTemplate([
        {
            click: () => {
                win.show();
            },
            label: "Show",
        },
        {
            click: () => {
                const application = electron_1.app;
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
    electron_1.app.on("before-quit", () => {
        win.removeAllListeners("close");
        win.close();
    });
    win.on('hide', () => {
        var _a;
        (_a = User_1.default.window) === null || _a === void 0 ? void 0 : _a.send("clearPages");
    });
    win.once("ready-to-show", () => {
        win.show();
    });
    win.setMenuBarVisibility(false);
    win.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/build/index.html`);
    win.on("close", (event) => {
        const application = electron_1.app;
        if (!application.isQuitting) {
            event.preventDefault();
            win.hide();
        }
        win.flashFrame(true);
        return false;
    });
    EventInit.start(win);
    /*events.forEach((event) => {
        ipcMain.on(event.name, event.response);
    });*/
});
process.on("uncaughtException", (e) => {
    console.log(e);
});
process.on("unhandledRejection", (e) => {
    console.log(e);
});
electron_1.app.on("window-all-closed", electron_1.app.quit);
const lock = electron_1.app.requestSingleInstanceLock();
if (!lock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('ready', startApp);
}
