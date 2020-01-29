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

        const storage = new Storage(user.id);
        this.storage = storage;
        return this;
    }

    public async logIn(username: string, password: string) {
        const result = await api.user.login({username, password, machineId: Machine.getMachineId() });
        if (result.status === 200) {
            await this.loadUser();
        }
        return result.status;
    }

    public async authenticate(authCode: number) {
        const result = await api.user.authenticate(authCode);
        if (result.status === 200) {
            await this.loadUser();
        }
        return result.status;
    }

    public getUser() {
        return this.user;
    }
}

const localUser = new User();

export default localUser;
