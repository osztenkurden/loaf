import { ipcMain } from "electron";
import * as I from "./../interface";

export const on = (eventName: string, handler: (...args: any[]) => I.IEventResponse) => {
    ipcMain.on(eventName, (event, ...args) => {
        const result = handler(...args);
        if (!result) {
            return;
        }
        event.reply(result.event, result.data);
    });
};
