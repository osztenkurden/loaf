"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var electron_1 = require("electron");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var directories = {
    db: path.join(electron_1.app.getPath("userData"), "database"),
    user: electron_1.app.getPath("userData")
};
exports.claimMachine = function () {
    var machineId = Math.round(Math.random() * 9999 + 1);
    var content = { machineId: machineId };
    fs.writeFileSync(path.join(directories.user, "machine.loaf"), JSON.stringify(content));
};
exports.checkDirectories = function () {
    Object.keys(directories).forEach(function (dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    });
    if (!fs.existsSync(path.join(directories.user, "machine.loaf"))) {
        exports.claimMachine();
    }
};
exports.getMachineId = function () {
    var file = fs.readFileSync(path.join(directories.user, "machine.loaf"), "UTF-8");
    try {
        var content = JSON.parse(file);
        return content.machineId;
    }
    catch (_a) {
        return 0;
    }
};
