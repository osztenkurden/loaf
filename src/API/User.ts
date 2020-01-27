export class UserStorage {
    public user: any;
    public store: string;

    constructor() {
        this.user = {};
        this.store = "";
    }

    public loadStore(store: string) {
        this.store = store;
    }
}
