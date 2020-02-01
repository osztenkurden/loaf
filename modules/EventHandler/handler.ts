import { ipcMain } from "electron";
import * as I from "./../interface";

export const on = (eventName: string, handler: (...args: any[]) => I.IEventResponse) => {
    ipcMain.on(eventName, (event, ...args) => {
        const result = handler(...args);
        if (!result) {
            return null;
        }
        event.returnValue = result.data;
    });
};

export const onAsync  = (eventName: string, handler: (...args: any[]) => Promise<I.IEventResponse>) => {
    ipcMain.on(eventName, async (event, ...args) => {
        const result = await handler(...args);
        if (!result) {
            return null;
        }
        event.reply(result.event, result.data);
    });
};

export const register = (eventName: string, ...args: any[]) => {
    return ipcMain.emit(eventName, args);
};
