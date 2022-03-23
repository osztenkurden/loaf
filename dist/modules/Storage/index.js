"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const API_1 = require("../API");
const Keys = __importStar(require("./../Breadbox/Keys"));
const LoafBreadbox_1 = __importDefault(require("./../Breadbox/LoafBreadbox"));
const Cypher_1 = __importDefault(require("./../Cypher"));
const Machine = __importStar(require("./../Machine"));
class Storage {
    constructor() {
        /*let storeContent = "";
        if (id) {
            this.userId = id;
            storeContent = this.loadStore();
        }
        const store = new Breadbox();
        store.init(storeContent);


        this.cypher = new Cypher(this.store);*/
        this.store = null;
        this.cypher = null;
    }
    init(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let storeContent = "";
            if (userId) {
                this.userId = userId;
                storeContent = this.loadStore();
            }
            const store = new LoafBreadbox_1.default();
            yield store.init(storeContent);
            this.store = store;
            this.saveStoreToFile();
            this.cypher = new Cypher_1.default(this.store);
        });
    }
    encodeMessage(message, recipientId, machineId, bundle) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cypher) {
                return null;
            }
            const encrypted = yield this.cypher.encrypt(message, recipientId, machineId, bundle);
            this.saveStoreToFile();
            return encrypted;
        });
    }
    decodeMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.cypher) {
                return null;
            }
            const content = yield this.cypher.decrypt(msg.content, msg.senderId, msg.senderMachine, msg.type === 3);
            this.saveStoreToFile();
            return content;
        });
    }
    setUserId(id) {
        if (this.userId) {
            return this;
        }
        this.userId = id;
        return this;
    }
    /**
     * Registration data retrivial methods
     */
    getRegistrationId() {
        var _a;
        return (_a = this.store) === null || _a === void 0 ? void 0 : _a.getLocalRegistrationId();
    }
    getIdentityKeyPair() {
        var _a;
        return (_a = this.store) === null || _a === void 0 ? void 0 : _a.getIdentityKeyPair();
    }
    getPreKeys() {
        var _a;
        return (_a = this.store) === null || _a === void 0 ? void 0 : _a.getPreKeys();
    }
    getSignedPreKey() {
        var _a;
        return (_a = this.store) === null || _a === void 0 ? void 0 : _a.getSignedPreKey();
    }
    /**
     * Saves up-to-date user encryption session to drive
     */
    saveStoreToFile() {
        var _a;
        const storePath = this.getStorePath();
        if (!fs.existsSync(storePath) && !this.userId) {
            return this;
        }
        else if (!fs.existsSync(storePath) && this.userId) {
            this.createStoreFile();
        }
        fs.writeFileSync(storePath, (_a = this.store) === null || _a === void 0 ? void 0 : _a.getStore(), "utf8");
        return this;
    }
    getStore() {
        return this.store;
    }
    getUserBundle(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield API_1.api.user.getBundle(userId);
            if (!response || !response.data) {
                return null;
            }
            const data = response.data;
            const signedKeyPair = {
                keyId: data.signedPreKey.keyId,
                publicKey: Keys.toArrayBuffer(data.signedPreKey.pubKey),
                signature: Keys.toArrayBuffer(data.signedPreKey.signature),
            };
            const preKeyPair = {
                keyId: data.preKey.keyId,
                publicKey: Keys.toArrayBuffer(data.preKey.pubKey),
            };
            const bundle = {
                identityKey: Keys.toArrayBuffer(data.identityKey),
                preKey: preKeyPair,
                registrationId: data.registrationId,
                signedPreKey: signedKeyPair,
            };
            return bundle;
        });
    }
    createSession(machine) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store, cypher } = this;
            const { userId, machineId } = machine;
            const session = yield (store === null || store === void 0 ? void 0 : store.loadSession(`${userId}.${machineId}`));
            if (session) {
                return true;
            }
            const bundle = yield this.getUserBundle(userId);
            if (!bundle) {
                return false;
            }
            const msg = { type: "text", content: "Hello there!" };
            const message = yield this.encodeMessage(msg, userId, machineId, bundle);
            return {
                content: message === null || message === void 0 ? void 0 : message.content,
                machineId,
                recipientId: userId,
                type: message === null || message === void 0 ? void 0 : message.type,
            };
        });
    }
    getStorePath() {
        const storePath = path.join(Machine.directories.db, `user-${this.userId}.loaf`);
        return storePath;
    }
    loadStore() {
        this.createStoreFile();
        const storeContent = fs.readFileSync(this.getStorePath(), "utf8");
        return storeContent;
    }
    createStoreFile() {
        const storePath = this.getStorePath();
        if (fs.existsSync(storePath)) {
            return this;
        }
        fs.writeFileSync(storePath, "");
        return this;
    }
}
exports.default = Storage;
