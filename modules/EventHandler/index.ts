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

        // PRETODO: Make sure it is actually necessary to call this from frontend
        return null;
    });

    Loaf.on("getUser", () => {

        return { event: "user", data: User.getUser() };
    });

    Loaf.on("getRegistrationId", () => {
        const storage = User.getStorage();
        if (!storage) {
            return { event: "registrationId", data: null };
        }
        return { event: "registrationId", data: storage.getRegistrationId() };
    });

    Loaf.on("getIdentityKey", () => {
        const storage = User.getStorage();
        if (!storage) {
            return { event: "identityKey", data: null };
        }
        return { event: "identityKey", data: storage.getIdentityKeyPair() };
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
