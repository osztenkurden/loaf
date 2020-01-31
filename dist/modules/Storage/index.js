"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var LoafBreadbox_1 = __importDefault(require("./../Breadbox/LoafBreadbox"));
var Cypher_1 = __importDefault(require("./../Cypher"));
var Machine = __importStar(require("./../Machine"));
var Storage = /** @class */ (function () {
    function Storage(id) {
        this.userId = id;
        var storeContent = this.loadStore();
        var store = new LoafBreadbox_1["default"](storeContent);
        this.store = store;
        this.saveStoreToFile();
        this.cypher = new Cypher_1["default"](this.store);
    }
    Storage.prototype.encodeMessage = function () {
        this.saveStoreToFile();
        return this.cypher;
    };
    Storage.prototype.decodeMessage = function () {
        this.saveStoreToFile();
        return this.cypher;
    };
    /*public set(store: string) {
        // this.store = store;
        return this;
    }*/
    Storage.prototype.getStorePath = function () {
        var storePath = path.join(Machine.directories.db, "user-" + this.userId + ".loaf");
        return storePath;
    };
    Storage.prototype.loadStore = function () {
        this.createStoreFile();
        var storeContent = fs.readFileSync(this.getStorePath(), "utf8");
        return storeContent;
    };
    Storage.prototype.saveStoreToFile = function () {
        var storePath = this.getStorePath();
        if (!fs.existsSync(storePath)) {
            return this;
        }
        fs.writeFileSync(storePath, this.store.getStore(), "utf8");
        return this;
    };
    Storage.prototype.createStoreFile = function () {
        var storePath = this.getStorePath();
        if (fs.existsSync(storePath)) {
            return this;
        }
        fs.writeFileSync(storePath, "");
        return this;
    };
    return Storage;
}());
exports["default"] = Storage;
