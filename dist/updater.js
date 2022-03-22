"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_updater_1 = require("electron-updater");
electron_updater_1.autoUpdater.on("checking-for-update", () => {
    console.log("checking for update");
});
electron_updater_1.autoUpdater.on("update-available", () => {
    console.log("update available");
});
electron_updater_1.autoUpdater.on("update-not-available", () => {
    console.log("update not available");
});
electron_updater_1.autoUpdater.checkForUpdates();
