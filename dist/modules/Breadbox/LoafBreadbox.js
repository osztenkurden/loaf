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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseKeyObject = exports.generateId = void 0;
const Keys = __importStar(require("./Keys"));
// import util from "util";
// declare let window: any;
// tslint:disable-next-line:no-var-requires
const libsignal = require("./../Breadcrumb/libsignal/index");
// tslint:disable-next-line:no-var-requires
const crypto = require("./../Breadcrumb/libsignal/crypto/index").crypto;
let util = {};
const generateId = (amount = 1) => {
    const array = new Uint32Array(amount);
    const randoms = crypto.getRandomValues(array);
    return randoms;
};
exports.generateId = generateId;
function toHex(str) {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
        hex += "" + str.charCodeAt(i).toString(16);
    }
    return hex;
}
function hexToAscii(hex) {
    hex = hex.toString(); // force conversion
    let str = "";
    for (let i = 0; (i < hex.length && hex.substr(i, 2) !== "00"); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
function parseKeyObject(obj) {
    const response = {
        keyId: obj.keyId,
        pubKey: Keys.toString(obj.pubKey),
        signature: obj.signature ? Keys.toString(obj.signature) : undefined,
    };
    return response;
}
exports.parseKeyObject = parseKeyObject;
class LoafBreadbox {
    constructor() {
        this.put = (key, value) => {
            if (key === undefined || value === undefined || key === null || value === null) {
                throw new Error("Tried to store undefined/null");
            }
            this.store[key] = value;
        };
        this.get = (key, defaultValue = undefined) => {
            if (key === null || key === undefined) {
                throw new Error("Tried to get value for undefined/null key");
            }
            if (key in this.store) {
                return this.store[key];
            }
            return defaultValue;
        };
        this.getIdentityKeyPair = () => {
            return Promise.resolve((this.get("identityKey")));
        };
        this.getLocalRegistrationId = () => {
            return Promise.resolve(this.get("registrationId"));
        };
        this.remove = (key) => {
            if (key === null || key === undefined)
                throw new Error("Tried to remove value for undefined/null key");
            delete this.store[key];
        };
        this.isTrustedIdentity = (identifier, identityKey, direction) => {
            if (identifier === null || identifier === undefined) {
                throw new Error("tried to check identity key for undefined/null key");
            }
            if (!(identityKey instanceof ArrayBuffer)) {
                throw new Error("Expected identityKey to be an ArrayBuffer");
            }
            const trusted = this.get(`identityKey${identifier}`);
            if (trusted === undefined) {
                return Promise.resolve(true);
            }
            return Promise.resolve(util.toString(identityKey) === util.toString(trusted));
        };
        this.loadIdentityKey = (identifier) => {
            if (identifier === null || identifier === undefined)
                throw new Error("Tried to get identity key for undefined/null key");
            return Promise.resolve(this.get(`identityKey${identifier}`));
        };
        this.saveIdentity = (identifier, identityKey) => {
            if (identifier === null || identifier === undefined)
                throw new Error("Tried to put identity key for undefined/null key");
            const address = new libsignal.SignalProtocolAddress.fromString(identifier);
            const existing = this.get(`identityKey${address.getName()}`);
            this.put(`identityKey${address.getName()}`, identityKey);
            if (existing && util.toString(identityKey) !== util.toString(existing)) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        };
        this.loadPreKey = (keyId) => {
            const res = this.get(`25519KeypreKey${keyId}`);
            if (res !== undefined) {
                return { pubKey: res.pubKey, privKey: res.privKey };
            }
            return Promise.resolve(res);
        };
        this.storePreKey = (keyId, keyPair) => {
            return Promise.resolve(this.put(`25519KeypreKey${keyId}`, keyPair));
        };
        this.removePreKey = (keyId) => {
            return Promise.resolve(this.remove(`25519KeypreKey${keyId}`));
        };
        this.loadSignedPreKey = (keyId) => {
            const res = this.get(`25519KeysignedKey${keyId}`);
            if (res !== undefined) {
                return { pubKey: res.pubKey, privKey: res.privKey, signature: res.signature };
            }
            return Promise.resolve(res);
        };
        this.storeSignedPreKey = (keyId, keyPair) => {
            return Promise.resolve(this.put(`25519KeysignedKey${keyId}`, keyPair));
        };
        this.removeSignedPreKey = (keyId) => {
            return Promise.resolve(this.remove(`25519KeysignedKey${keyId}`));
        };
        this.createSession = (address, preKeyBundle) => __awaiter(this, void 0, void 0, function* () {
            const sessionBuilder = new libsignal.SessionBuilder(this, address);
            try {
                yield sessionBuilder.processPreKey(preKeyBundle);
                return true;
            }
            catch (e) {
                console.error("ERROR");
                console.error(e);
                return false;
            }
        });
        this.getSignedPreKey = () => {
            const objKeys = Object.keys(this.store).filter((key) => key.startsWith("25519KeysignedKey"));
            const keys = objKeys.map((key) => this.store[key]).map(parseKeyObject);
            return keys[0];
        };
        this.getPreKeys = () => {
            const objKeys = Object.keys(this.store).filter((key) => key.startsWith("25519KeypreKey"));
            const keys = objKeys.map((key) => this.store[key]).map(parseKeyObject);
            return keys;
        };
        this.createPreKeys = (preKeysAmount) => __awaiter(this, void 0, void 0, function* () {
            const randomIds = exports.generateId(preKeysAmount);
            const keyHelper = libsignal.KeyHelper;
            const preKeys = [];
            for (let i = 0; i < preKeysAmount; i++) {
                const preKey = yield keyHelper.generatePreKey(randomIds[i]);
                preKeys.push(preKey);
                yield this.storePreKey(preKey.keyId, Object.assign(Object.assign({}, preKey.keyPair), { keyId: preKey.keyId }));
            }
            return preKeys;
        });
        this.loadSession = (identifier) => {
            return Promise.resolve(this.get(`session${identifier}`));
        };
        this.storeSession = (identifier, record) => {
            return Promise.resolve(this.put(`session${identifier}`, record));
        };
        this.removeSession = (identifier) => {
            return Promise.resolve(this.remove(`session${identifier}`));
        };
        this.removeAllSessions = (identifier) => {
            for (const id in this.store) {
                if (id.startsWith(`session${identifier}`)) {
                    delete this.store[id];
                }
            }
            return Promise.resolve();
        };
        this.isValidKeyPair = (keyPair) => {
            return (keyPair.pubKey && keyPair.privKey
                && typeof keyPair.pubKey === "string"
                && typeof keyPair.privKey === "string");
        };
        this.setStore = (data) => {
            try {
                const json = hexToAscii(data);
                const store = JSON.parse(json);
                for (const i of Object.keys(store)) {
                    if (typeof i !== "string") {
                        throw new Error("");
                    }
                    if (this.isValidKeyPair(store[i])) {
                        //
                        const keyPair = Keys.bufferify(store[i]);
                        const inStoreKeyPair = {
                            keyId: store[i].keyId,
                            privKey: keyPair.privKey,
                            pubKey: keyPair.pubKey,
                            signature: store[i].signature ? Keys.toArrayBuffer(store[i].signature) : undefined,
                        };
                        this.put(i, inStoreKeyPair);
                    }
                    else if (i.startsWith("session")) {
                        this.put(i, store[i]);
                    }
                    else if (i === "registrationId" && Number.isInteger(store[i])) {
                        this.put(i, store[i]);
                    }
                    else if (i.startsWith("25519KeypreKey") || i.startsWith("25519KeysignedKey")) {
                        const keyPair = Keys.bufferify(store[i]);
                        const inStoreKeyPair = {
                            keyId: store[i].keyId,
                            privKey: keyPair.privKey,
                            pubKey: keyPair.pubKey,
                            signature: store[i].signature ? Keys.toArrayBuffer(store[i].signature) : undefined,
                        };
                        this.put(i, inStoreKeyPair);
                    }
                }
                return;
            }
            catch (_a) {
                return;
            }
        };
        this.getStore = () => {
            if (!this.store.registrationId || !this.store.identityKey) {
                throw new Error("");
            }
            const json = {
                identityKey: Keys.stringify(this.store.identityKey),
                registrationId: this.store.registrationId,
            };
            for (const i of Object.keys(this.store)) {
                if (typeof i !== "string") {
                    throw new Error("");
                }
                if (i.startsWith("25519KeypreKey") || i.startsWith("25519KeysignedKey")) {
                    const keyPair = Keys.stringify(this.store[i]);
                    json[i] = {
                        keyId: this.store[i].keyId,
                        privKey: keyPair.privKey,
                        pubKey: keyPair.pubKey,
                    };
                    if (this.store[i].signature) {
                        json[i].signature = Keys.toString(this.store[i].signature);
                    }
                }
                if ((i.startsWith("identityKey") && i !== "identityKey") || i.startsWith("session")) {
                    json[i] = this.store[i];
                }
            }
            const stringified = JSON.stringify(json);
            const hexStore = toHex(stringified);
            return hexStore;
        };
        this.Direction = {
            RECEIVING: 2,
            SENDING: 1,
        };
        this.store = {};
    }
    init(storeHex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (storeHex) {
                return this.setStore(storeHex);
            }
            const keyHelper = libsignal.KeyHelper;
            const registrationId = yield keyHelper.generateRegistrationId();
            const identityKeyPair = yield keyHelper.generateIdentityKeyPair();
            yield this.createPreKeys(20);
            const signedPreKeyGenId = exports.generateId()[0];
            const signedPreKeys = yield keyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyGenId);
            const signedPreKey = Object.assign({ keyId: signedPreKeys.keyId, signature: signedPreKeys.signature }, signedPreKeys.keyPair);
            this.put("identityKey", identityKeyPair);
            this.put("registrationId", registrationId);
            yield this.storeSignedPreKey(signedPreKey.keyId, signedPreKey);
        });
    }
}
exports.default = LoafBreadbox;
