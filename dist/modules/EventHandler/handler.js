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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.onAsync = exports.on = void 0;
const electron_1 = require("electron");
const on = (eventName, handler) => {
    electron_1.ipcMain.on(eventName, (event, ...args) => {
        const result = handler(...args);
        if (!result) {
            return null;
        }
        event.returnValue = result.data;
    });
};
exports.on = on;
const onAsync = (eventName, handler) => {
    electron_1.ipcMain.on(eventName, (event, ...args) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield handler(...args);
        if (!result) {
            return null;
        }
        event.reply(result.event, result.data);
    }));
};
exports.onAsync = onAsync;
const register = (eventName, ...args) => {
    return electron_1.ipcMain.emit(eventName, args);
};
exports.register = register;
