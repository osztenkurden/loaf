import crypto from "crypto";
import base32 from "thirty-two";
import Inbox from "../Inbox";
import * as I from "../interface";
import Storage from "../Storage";
import { api } from "./../API";
import { parseKeyObject } from "./../Breadbox/LoafBreadbox";
import { generateKeys } from "./../Crypto/DiffieHellman";
import { initSockets } from "./../EventHandler";
import * as Machine from "./../Machine";

export class User {
    private id: number | null;
    private user: I.IUser | null;
    private storage: Storage | null;
    private inbox: Inbox | null;
    private window: Electron.WebContents;

    constructor() {
        this.id = null;
        this.user = null;
        this.storage = null;
        this.window = null;
    }

    public assign(window: Electron.WebContents) {
        this.window = window;
    }

    public async loadUser() {
        const user = await api.user.get();
        if (!user) {
            return this;
        }

        this.user = user;

        await this.initStorage(user.id);
        this.initInbox();
        initSockets();
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
            const keys: any = await generateKeys();
            const storage = (await this.initStorage()).getStorage();
            const payload: I.IRegisterPayload = {
                 firstName,
                 identityKey: parseKeyObject(await storage.getIdentityKeyPair()).pubKey,
                 keys: this.getKeys(keys),
                 machineId: Machine.getMachineId(),
                 password,
                 preKeys: storage.getPreKeys(),
                 registrationId: await storage.getRegistrationId(),
                 signedPreKey: storage.getSignedPreKey(),
                 username,
            };
            const result = await api.user.register(payload);
            if (!result) {
                return false;
            }

            const user = result;

            storage.setUserId(user.id).saveStoreToFile();

            if(keys.token){
                console.log(`${username} registered`)
                return base32.encode(keys.token).toString().replace(/=/g, "");;
            }

            const diffieHellman = crypto.createDiffieHellman(keys.prime, "hex", keys.gen, "hex");
            diffieHellman.setPrivateKey(keys.private, "hex");
            diffieHellman.setPublicKey(keys.public, "hex");

            const secret = diffieHellman.computeSecret(user.publicKey);

            const token = base32.encode(secret).toString().replace(/=/g, "");
            return token;
         } catch (e) {
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

    public getInbox() {
        return this.inbox;
    }

    public getStorage() {
        return this.storage;
    }

    public getUser() {
        return this.user;
    }

    private initInbox() {
        if (!this.inbox && this.user.id) {
            this.inbox = new Inbox(this.window, this.user.id, this.storage);
        }
        return this;
    }

    private getKeys(keys: any) {
        if(keys.token){
            const key: I.IDebugKeys = {
                token: keys.token
            }

            return key;
        }
        const key: I.IKeys = {
            generator: keys.gen,
            prime: keys.prime,
            public: keys.public
        }
        return key;
    }
}

const localUser = new User();

export default localUser;
