import * as fs from "fs";
import * as path from "path";

export default class Storage {
    private id: number;
    private store: string;

    constructor(id: number) {
        this.id = id;
        this.store = "";
    }

    public get() {
        return this.store;
    }

    public set(store: string) {
        this.store = store;
        return this;
    }
}
