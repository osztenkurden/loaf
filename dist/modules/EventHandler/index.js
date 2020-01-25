"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Machine = __importStar(require("./../Machine"));
var User = __importStar(require("./../UserStorage"));
var Loaf = __importStar(require("./handler"));
exports.start = function () {
    Loaf.on("getUser", function (userId) {
        var user = User.getUser(userId);
        return { event: "getUser", data: user };
    });
    Loaf.on("saveUser", function (userId, user) {
        User.setUser(userId, user);
        return null;
    });
    Loaf.on("getMachineId ", function () {
        var machineId = Machine.getMachineId();
        return { event: "getMachineId", data: machineId };
    });
    Loaf.on("createKeys", function () {
        // TODO: Add child process for creating keys
        return null;
    });
};
