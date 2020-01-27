import * as Machine from "./../Machine";
import User from "./../User";
import * as Loaf from "./handler";

export const start = () => {
    Loaf.on("getUserStore", () => {
        const user = User.getStore();

        return { event: "getUserStore", data: user };
    });

    Loaf.on("setUserStore", (store: string) => {
        User.setStore(store);
        return null;
    });

    Loaf.on("getMachineId", () => {
        const machineId = Machine.getMachineId();

        return { event: "getMachineId", data: machineId };
    });

    Loaf.on("createKeys", () => {
        // TODO: Add child process for creating keys
        return null;
    });

    Loaf.on("loadUser", () => {
        User.loadUser();
        return null;
    });
};
