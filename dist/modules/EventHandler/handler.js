"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
exports.on = function (eventName, handler) {
    electron_1.ipcMain.on(eventName, function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = handler.apply(void 0, args);
        if (!result) {
            return;
        }
        event.reply(result.event, result.data);
    });
};
