import { autoUpdater } from 'electron-updater';

autoUpdater.on("update-available", () => {
    console.log("update available");
});

autoUpdater.on("update-not-available", () => {
    console.log("update not available");
});

autoUpdater.on("download-progress", () => {
    console.log("Downloading...");
});

autoUpdater.checkForUpdates();