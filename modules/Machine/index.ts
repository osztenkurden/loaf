import { app } from "electron";
import * as fs from "fs";
import * as path from "path";

const directories = {
    db: path.join(app.getPath("userData"), "database"),
    user: app.getPath("userData"),
};

export const claimMachine = () => {
    const machineId = Math.round(Math.random() * 9999 + 1);
    const content = { machineId };

    fs.writeFileSync(path.join(directories.user, "machine.loaf"), JSON.stringify(content));
};

export const checkDirectories = () => {
    Object.keys(directories).forEach((dir) => {
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
