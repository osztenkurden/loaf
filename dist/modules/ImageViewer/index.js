"use strict";
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
// import * as Storage from "./storage/storage";
const isDev = process.env.DEV === "true";
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    electron_1.app.setAppUserModelId("com.bakerysoft.loaf");
    const win = new electron_1.BrowserWindow({
        icon: path_1.default.join(__dirname, "assets/icon.png"),
        fullscreen: true,
        frame: false,
        focusable: true,
        show: false,
        title: "Loaf Media Viewer",
        webPreferences: {
            backgroundThrottling: false,
            // preload: __dirname + "/preload.js",
            nodeIntegration: true,
        },
    });
    electron_1.app.on("before-quit", () => {
        win.removeAllListeners("close");
        win.close();
    });
    win.once("ready-to-show", win.show);
    win.setMenuBarVisibility(false);
    win.loadURL(isDev ? "http://localhost:3000" : `file://${__dirname}/build/index.html`);
    /*events.forEach((event) => {
        ipcMain.on(event.name, event.response);
    });*/
});
electron_1.app.on("window-all-closed", electron_1.app.quit);
electron_1.app.on("ready", startApp);
