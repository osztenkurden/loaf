import * as fs from "fs";
import * as path from "path";
import Breadbox from "./../Breadbox/LoafBreadbox";
import Cypher from "./../Cypher";
import * as Machine from "./../Machine";

export default class Storage {
    private userId: number;
    private store: Breadbox;
    private cypher: Cypher;

    constructor(id: number) {
        this.userId = id;
        const storeContent = this.loadStore();
        const store = new Breadbox(storeContent);

        this.store = store;
        this.saveStoreToFile();

        this.cypher = new Cypher(this.store);
    }

    public encodeMessage() {

        this.saveStoreToFile();
        return this.cypher;
    }

    public decodeMessage() {

        this.saveStoreToFile();
        return this.cypher;
    }

    /*public set(store: string) {
        // this.store = store;
        return this;
    }*/

    private getStorePath() {
        const storePath = path.join(Machine.directories.db, `user-${this.userId}.loaf`);
        return storePath;
    }

    private loadStore() {
        this.createStoreFile();

        const storeContent = fs.readFileSync(this.getStorePath(), "utf8");

        return storeContent;
    }

    private saveStoreToFile() {
        const storePath = this.getStorePath();
        if (!fs.existsSync(storePath)) {
            return this;
        }

        fs.writeFileSync(storePath, this.store.getStore(), "utf8");
        return this;
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
