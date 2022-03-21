"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMachine = exports.getMachineName = exports.getMachineId = exports.checkDirectories = exports.claimMachine = exports.directories = void 0;
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const os_1 = __importDefault(require("os"));
const path = __importStar(require("path"));
const LoafBreadbox_1 = require("./../Breadbox/LoafBreadbox");
exports.directories = {
    user: electron_1.app.getPath("userData"),
    db: path.join(electron_1.app.getPath("userData"), "database"),
    files: path.join(electron_1.app.getPath('downloads'), 'Loaf Messenger'),
    messages: path.join(electron_1.app.getPath("userData"), "database", "messages"),
    images: path.join(electron_1.app.getPath('userData'), 'images')
};
const claimMachine = () => {
    const machineId = LoafBreadbox_1.generateId()[0];
    const content = { machineId };
    fs.writeFileSync(path.join(exports.directories.user, "machine.loaf"), JSON.stringify(content));
};
exports.claimMachine = claimMachine;
const checkDirectories = () => {
    Object.values(exports.directories).forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    });
    if (!fs.existsSync(path.join(exports.directories.user, "machine.loaf"))) {
        exports.claimMachine();
    }
};
exports.checkDirectories = checkDirectories;
const getMachineId = () => {
    const file = fs.readFileSync(path.join(exports.directories.user, "machine.loaf"), "UTF-8");
    try {
        const content = JSON.parse(file);
        return content.machineId;
    }
    catch (_a) {
        return 0;
    }
};
exports.getMachineId = getMachineId;
const getMachineName = () => {
    function OS(platform) {
        if (platform === "freebsd") {
            return "FreeBSD";
        }
        if (platform === "win32") {
            return "Windows";
        }
        return platform[0].toUpperCase() + platform.substr(1);
    }
    return `${OS(os_1.default.platform())} ${os_1.default.release()} - ${os_1.default.hostname()}`;
};
exports.getMachineName = getMachineName;
const getMachine = () => {
    return { name: exports.getMachineName(), id: exports.getMachineId() };
};
exports.getMachine = getMachine;
