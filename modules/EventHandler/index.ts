import * as Machine from "./../Machine";
import User from "./../User";
import * as Loaf from "./handler";

export const start = () => {
    Loaf.on("getMachineId", () => {
        const machineId = Machine.getMachineId();

        return { event: "getMachineId", data: machineId };
    });

    Loaf.on("createKeys", () => {
        // TODO: Add child process for creating keys
        return null;
    });

    Loaf.on("getUser", () => {

        return { event: "user", data: User.getUser() };
    });

    Loaf.onAsync("authenticateUser", async (authCode: number) => {
        const status = await User.authenticate(authCode);

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("logInUser", async (username: string, password: string) => {
        const status = await User.logIn(username, password);

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("loadUser", async () => {
        await User.loadUser();
        return { event: "user", data: User.getUser() };
    });
};
