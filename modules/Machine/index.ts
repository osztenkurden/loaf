import { app } from "electron";
import * as fs from "fs";
import os from "os";
import * as path from "path";
import { generateId } from "./../Breadbox/LoafBreadbox";

export const directories = {
    db: path.join(app.getPath("userData"), "database"),
    user: app.getPath("userData"),
    files: path.join(app.getPath("userData"), "database", "files"),
    messages: path.join(app.getPath("userData"), "database", "messages"),

};

export const claimMachine = () => {
    const machineId = generateId()[0];
    const content = { machineId };

    fs.writeFileSync(path.join(directories.user, "machine.loaf"), JSON.stringify(content));
};

export const checkDirectories = () => {
    Object.values(directories).forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    });
    if (!fs.existsSync(path.join(directories.user, "machine.loaf"))) {
        claimMachine();
    }
};

export const getMachineId = (): number => {
    const file = fs.readFileSync(path.join(directories.user, "machine.loaf"), "UTF-8");
    try {
        const content = JSON.parse(file);
        return content.machineId;
    } catch {
        return 0;
    }
};

export const getMachineName = () => {
    function OS(platform) {
        if (platform === "freebsd") {
            return "FreeBSD";
        }
        if (platform === "win32") {
            return "Windows";
        }
        return platform[0].toUpperCase() + platform.substr(1);
    }
    return `${OS(os.platform())} ${os.release()} - ${os.hostname()}`;
};

export const getMachine = () => {
    return { name: getMachineName(), id: getMachineId() };
};
