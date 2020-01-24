import * as Machine from "./../Machine";
import * as User from "./../UserStorage";
import * as Loaf from "./handler";

export const start = () => {
    Loaf.on("getUser", (userId: number) => {
        const user = User.getUser(userId);

        return { event: "getUser", data: user };
    });

    Loaf.on("saveUser", (userId: number, user: string) => {
        User.setUser(userId, user);
        return null;
    });

    Loaf.on("getMachineId ", () => {
        const machineId = Machine.getMachineId();

        return { event: "getMachineId", data: machineId };
    });

    Loaf.on("createKeys", () => {
        // TODO: Add child process for creating keys
        return null;
    });
};
