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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var EventInit = __importStar(require("./modules/EventHandler"));
var Machine = __importStar(require("./modules/Machine"));
// import * as Storage from "./storage/storage";
var isDev = process.env.DEV === "true";
var startApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var win, tray, context, not;
    return __generator(this, function (_a) {
        electron_1.app.setAppUserModelId("com.bakerysoft.loaf");
        Machine.checkDirectories();
        win = new electron_1.BrowserWindow({
            height: 720,
            icon: path_1["default"].join(__dirname, "assets/icon.png"),
            minHeight: 600,
            minWidth: 400,
            show: false,
            title: "Loaf Messenger",
            webPreferences: {
                backgroundThrottling: false,
                preload: __dirname + "/preload.js"
            },
            width: 1280
        });
        tray = new electron_1.Tray(path_1["default"].join(__dirname, "assets/icon.png"));
        context = electron_1.Menu.buildFromTemplate([
            {
                click: function () {
                    var application = electron_1.app;
                    application.isQuitting = true;
                    application.quit();
                },
                label: "Quit Loaf Messenger"
            },
        ]);
        tray.setContextMenu(context);
        tray.setToolTip("Loaf Messenger");
        tray.on("click", function () {
            win.show();
        });
        electron_1.app.on("before-quit", function () {
            win.removeAllListeners("close");
            win.close();
        });
        win.once("ready-to-show", win.show);
        win.setMenuBarVisibility(false);
        win.loadURL(isDev ? "http://localhost:3000" : "file://" + __dirname + "/build/index.html");
        win.on("close", function (event) {
            var application = electron_1.app;
            if (!application.isQuitting) {
                event.preventDefault();
                win.hide();
            }
            return false;
        });
        EventInit.start();
        if (electron_1.Notification.isSupported()) {
            not = new electron_1.Notification({
                body: "CIAŁO",
                icon: path_1["default"].join(__dirname, "assets/icon.png"),
                subtitle: "PODTYTUŁ",
                title: "TYTU"
            });
            not.on("show", function () {
                console.log("NOT asdasdUPPORTED");
            });
            not.show();
        }
        return [2 /*return*/];
    });
}); };
electron_1.app.on("window-all-closed", electron_1.app.quit);
electron_1.app.on("ready", startApp);
