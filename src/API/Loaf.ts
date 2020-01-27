const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export const api = (eventName: string, sync: boolean, ...args: any[]) => {
    if (sync) {
        return ipcRenderer.sendSync(eventName, ...args);
    }
    ipcRenderer.send(eventName, ...args);
    return;
    // return new Promise((res, rej) => {
        /*ipcRenderer.on(`${eventName}`, (event, ...vals) => {
            //
            ipcRenderer.removeAllListeners(`${eventName}`);
        });*/
   // });
};

export const on = (eventName: string, callback: (...args: any[]) => void) => {
    ipcRenderer.on(eventName, (event: any, ...vals: any[]) => {
        callback(...vals);
    });
};
