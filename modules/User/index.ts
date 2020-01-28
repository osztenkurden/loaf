import * as I from "../interface";
import { api } from "./../API";
import Storage from "./../UserStorage";

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

        const storage = new Storage(user.id);
        this.storage = storage;
        return this;
    }

    public async logIn(username: string, password: string) {
        const result = await api.user.login({username, password, machineId: 6809 });
        if (result.status === 200) {
            await this.loadUser();
        }
        return result.status;
    }

    public getStore() {
        if (!this.storage) {
            return null;
        }
        return this.storage.get();
    }

    public setStore(store: string) {
        if (!this.storage) {
            return null;
        }
        this.storage.set(store);
        return this;
    }

    public getUser() {
        return this.user;
    }
}

const localUser = new User();

export default localUser;
