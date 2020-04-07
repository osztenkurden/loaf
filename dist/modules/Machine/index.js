"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var electron_1 = require("electron");
var fs = __importStar(require("fs"));
var os_1 = __importDefault(require("os"));
var path = __importStar(require("path"));
var LoafBreadbox_1 = require("./../Breadbox/LoafBreadbox");
exports.directories = {
    db: path.join(electron_1.app.getPath("userData"), "database"),
    user: electron_1.app.getPath("userData"),
    messages: path.join(electron_1.app.getPath("userData"), "database", "messages")
};
exports.claimMachine = function () {
    var machineId = LoafBreadbox_1.generateId()[0];
    var content = { machineId: machineId };
    fs.writeFileSync(path.join(exports.directories.user, "machine.loaf"), JSON.stringify(content));
};
exports.checkDirectories = function () {
    Object.values(exports.directories).forEach(function (dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    });
    if (!fs.existsSync(path.join(exports.directories.user, "machine.loaf"))) {
        exports.claimMachine();
    }
};
exports.getMachineId = function () {
    var file = fs.readFileSync(path.join(exports.directories.user, "machine.loaf"), "UTF-8");
    try {
        var content = JSON.parse(file);
        return content.machineId;
    }
    catch (_a) {
        return 0;
    }
};
exports.getMachineName = function () {
    function OS(platform) {
        if (platform === "freebsd") {
            return "FreeBSD";
        }
        if (platform === "win32") {
            return "Windows";
        }
        return platform[0].toUpperCase() + platform.substr(1);
    }
    return OS(os_1["default"].platform()) + " " + os_1["default"].release() + " - " + os_1["default"].hostname();
};
exports.getMachine = function () {
    return { name: exports.getMachineName(), id: exports.getMachineId() };
};
