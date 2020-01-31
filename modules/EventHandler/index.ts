import { generateKeys } from "./../Crypto/DiffieHellman";
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

    Loaf.onAsync("register", async (username: string, password: string, name: string) => {
        try {
           const keys = await generateKeys();
           const storage = (await User.initStorage()).getStorage();
           const body = {
                firstName: name,
                identityKey: storage.getIdentityKeyPair().pubKey,
                keys: {
                    generator: keys.gen,
                    prime: keys.prime,
                    public: keys.public,
                },
                password,
                preKeys: storage.getPreKeys(),
                registrationId: storage.getRegistrationId(),
                signedPreKey: storage.getSignedPreKey(),
                username,
           };
           console.log(body);
           return { event: "userCreated", data: true };
        } catch (e) {
            console.log(e);
            return { event: "userCreated", data: false };
        }
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
