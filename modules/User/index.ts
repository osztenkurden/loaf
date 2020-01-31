import { generateKeys } from "./../Crypto/DiffieHellman";
import * as I from "../interface";
import Storage from "../Storage";
import { api } from "./../API";
import * as Machine from "./../Machine";

export class User {
    private id: number | null;
    private user: I.IUser | null;
    private storage: Storage | null;

    constructor() {
        this.id = null;
        this.user = null;
        this.storage = null;
    }

    public async loadUser() {
        const user = await api.user.get();
        if (!user) {
            return this;
        }

        this.user = user;

        await this.initStorage(user.id);
        /*
        const storage = new Storage();

        await storage.init(user.id);

        this.storage = storage;
        */
        return this;
    }

    public async logIn(username: string, password: string) {
        const result = await api.user.login({username, password, machineId: Machine.getMachineId() });
        if (result.status === 200) {
            await this.loadUser();
        }
        return result.status;
    }

    public async register(username: string, password: string, firstName: string) {
        try {
            const keys = await generateKeys();
            const storage = (await this.initStorage()).getStorage();
            const payload: I.IRegisterPayload = {
                 firstName,
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
            const result = await api.user.register(payload);
            if (!result) {
                return false;
            }

            // TODO: Mockup for saving user data after register, validate

            const user = result.user;

            storage.setUserId(user.id).saveStoreToFile();

            return true;
         } catch (e) {
             console.log(e);
             return false;
         }
    }

    public async authenticate(authCode: number) {
        const result = await api.user.authenticate(authCode, Machine.getMachineName());
        if (result.status === 200) {
            await this.loadUser();
        }
        return result.status;
    }

    public async initStorage(userId?: number) {
        if (!this.storage) {
            this.storage = new Storage();
            await this.storage.init(userId);
        }
        return this;
    }

    public getStorage() {
        return this.storage;
    }

    public getUser() {
        return this.user;
    }
}

const localUser = new User();

export default localUser;
