import * as fs from "fs";
import * as path from "path";
import { api } from "../API";
import * as I from "../interface";
import Breadbox from "./../Breadbox/LoafBreadbox";
import Cypher from "./../Cypher";
import * as Machine from "./../Machine";

export default class Storage {
    private userId?: number;
    private store: Breadbox | null;
    private cypher: Cypher | null;

    constructor() {
        /*let storeContent = "";
        if (id) {
            this.userId = id;
            storeContent = this.loadStore();
        }
        const store = new Breadbox();
        store.init(storeContent);

        this.store = store;
        this.saveStoreToFile();

        this.cypher = new Cypher(this.store);*/

    }

    public async init(userId?: number) {
        let storeContent = "";
        if (userId) {
            this.userId = userId;
            storeContent = this.loadStore();
        }
        const store = new Breadbox();
        await store.init(storeContent);

        this.store = store;
        this.saveStoreToFile();

        this.cypher = new Cypher(this.store);
    }

    public async encodeMessage(message: I.IMessageContent, recipientId: number, machineId: number, bundle?: any) {
        if (!this.cypher) {
            return null;
        }

        const encrypted = await this.cypher.encrypt(message, recipientId, machineId, bundle);

        this.saveStoreToFile();
        return encrypted;
    }

    public async decodeMessage(message: I.IMessageRaw) {
        if (!this.cypher) {
            return null;
        }

        const content = await this.cypher.decrypt(message.content, message.senderId, message.senderMachine, message.type === 3);

        this.saveStoreToFile();
        return content;
    }

    public setUserId(id: number) {
        if (this.userId) {
            return this;
        }
        this.userId = id;
        return this;
    }
    /**
     * Registration data retrivial methods
     */

    public getRegistrationId() {
        return this.store.getLocalRegistrationId();
    }

    public getIdentityKeyPair() {
        return this.store.getIdentityKeyPair();
    }

    public getPreKeys() {
        return this.store.getPreKeys();
    }

    public getSignedPreKey() {
        return this.store.getSignedPreKey();
    }

    /**
     * Saves up-to-date user encryption session to drive
     */

    public saveStoreToFile() {
        const storePath = this.getStorePath();
        if (!fs.existsSync(storePath) && !this.userId) {
            return this;
        } else if (!fs.existsSync(storePath) && this.userId) {
            this.createStoreFile();
        }
        fs.writeFileSync(storePath, this.store.getStore(), "utf8");
        return this;
    }

    public getStore() {
        return this.store;
    }

    public async getUserBundle(userId: number) {
        const response = await api.user.getBundle(userId);
        if (!response || !response.data) {
            return null;
        }
        return response.data as I.IPreKeyBundle;
    }

    public async createSession(machine: I.IMachine) {
        const { store, cypher } = this;
        const { userId, machineId } = machine;
        const session = store.loadSession(`${userId}.${machineId}`);
        if (session) {
            return true;
        }

        const bundle = await this.getUserBundle(userId);
        if (!bundle) {
            return false;
        }
        const msg: I.IMessageContent = { type: "text", content: "Hello there!" };
        const message = await this.encodeMessage(msg, userId, machineId, bundle);
        
        return {
            content: message.body,
            machineId,
            recipientId: userId,
            type: message.type,
        };
    }

    private getStorePath() {
        const storePath = path.join(Machine.directories.db, `user-${this.userId}.loaf`);
        return storePath;
    }

    private loadStore() {
        this.createStoreFile();

        const storeContent = fs.readFileSync(this.getStorePath(), "utf8");

        return storeContent;
    }

    private createStoreFile() {
        const storePath = this.getStorePath();
        if (fs.existsSync(storePath)) {
            return this;
        }

        fs.writeFileSync(storePath, "");
        return this;
    }
}
