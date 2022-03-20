
const ipcRenderer = window.ipcApi;

export const api = (eventName: string, sync: boolean, ...args: any[]) => {
    if(!ipcRenderer) return;
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
    if(!ipcRenderer) return;
    ipcRenderer.on(eventName, (...vals: any[]) => {
        callback(...vals);
    });
};
