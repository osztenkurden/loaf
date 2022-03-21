"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcApi', {
    send: (channel, ...data) => {
        electron_1.ipcRenderer.send(channel, ...data);
    },
    sendSync: (eventName, ...args) => {
        return electron_1.ipcRenderer.sendSync(eventName, ...args);
    },
    on: (channel, func) => {
        electron_1.ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
});
