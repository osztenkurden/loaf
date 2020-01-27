import { api } from "./../API";
import Storage from "./../UserStorage";

export class User {
    private id: number | null;
    private user: any;
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

        const storage = new Storage(user.id);
        this.storage = storage;
        return this;
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
