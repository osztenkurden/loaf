import * as I from "./../interface";
import * as Keys from "./Keys";
// import util from "util";

// declare let window: any;

// tslint:disable-next-line:no-var-requires
const libsignal = require("./../Breadcrumb/libsignal/index");
// tslint:disable-next-line:no-var-requires
const crypto = require("./../Breadcrumb/libsignal/crypto/index").crypto;

export const generateId = (amount = 1) => {
    const array = new Uint32Array(amount);
    const randoms: number[] = crypto.getRandomValues(array);
    return randoms;
};

function toHex(str: string) {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
        hex += "" + str.charCodeAt(i).toString(16);
    }
    return hex;
}
function hexToAscii(hex: string) {
    hex = hex.toString(); // force conversion
    let str = "";
    for (let i = 0; (i < hex.length && hex.substr(i, 2) !== "00"); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function parseKeyObject(obj: I.IKeyObject) {
    const response = {
        keyId: obj.keyId,
        pubKey: Keys.toString(obj.pubKey),
        signature: obj.signature ? Keys.toString(obj.signature) : undefined,
    };
    return response;
}

class LoafBreadbox {
    public Direction: {
        SENDING: number;
        RECEIVING: number;
    };
    public store: any;

    constructor() {
        this.Direction = {
            RECEIVING: 2,
            SENDING: 1,
        };
        this.store = {};
    }

    public put = (key: string, value: any) => {
        if (key === undefined || value === undefined || key === null || value === null) {
            throw new Error("Tried to store undefined/null");
        }
        this.store[key] = value;
    }

    public get = (key: string, defaultValue: any = undefined) => {
        if (key === null || key === undefined) {
            throw new Error("Tried to get value for undefined/null key");
        }
        if (key in this.store) {
            return this.store[key];
        }
        return defaultValue;
    }

    public getIdentityKeyPair = () => {
        return parseKeyObject(this.get("identityKey"));
    }

    public getLocalRegistrationId = () => {
        return this.get("registrationId");
    }

    public remove = (key: string) => {
        if (key === null || key === undefined)
            throw new Error("Tried to remove value for undefined/null key");
        delete this.store[key];
    }

    public isTrustedIdentity = (identifier: string, identityKey: ArrayBuffer, direction: any) => {
        if (identifier === null || identifier === undefined) {
            throw new Error("tried to check identity key for undefined/null key");
        }
        if (!(identityKey instanceof ArrayBuffer)) {
            throw new Error("Expected identityKey to be an ArrayBuffer");
        }
        const trusted = this.get(`identityKey${identifier}`);
        if (trusted === undefined) {
            return true;
        }
        return identityKey.toString() === trusted.toString();
    }

    public loadIdentityKey = (identifier: string) => {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        return this.get(`identityKey${identifier}`);
    }

    public saveIdentity = (identifier: string, identityKey: ArrayBuffer) => {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");
        const address = new libsignal.SignalProtocolAddress.fromString(identifier);
        const existing = this.get(`identityKey${address.getName()}`);

        this.put(`identityKey${address.getName()}`, identityKey);

        if (existing && identityKey.toString() !== existing.toString()) {
            return true;
        }
        return false;
    }

    public loadPreKey = (keyId: string) => {
        const res = this.get(`25519KeypreKey${keyId}`);
        if (res !== undefined) {
            return { pubKey: res.pubKey, privKey: res.privKey };
        }
        return res;
    }

    public storePreKey = (keyId: string, keyPair: any) => {
        return this.put(`25519KeypreKey${keyId}`, keyPair);
    }

    public removePreKey = (keyId: string) => {
        return this.remove(`25519KeypreKey${keyId}`);
    }

    public loadSignedPreKey = (keyId: string) => {
        const res = this.get(`25519KeysignedKey${keyId}`);
        if (res !== undefined) {
            return { pubKey: res.pubKey, privKey: res.privKey, signature: res.signature };
        }
        return res;
    }

    public storeSignedPreKey = (keyId: string, keyPair: any) => {
        return this.put(`25519KeysignedKey${keyId}`, keyPair);
    }

    public removeSignedPreKey = (keyId: string) => {
        return this.remove(`25519KeysignedKey${keyId}`);
    }

    public createSession = async (address: any, preKeyBundle: I.IPreKeyBundle) => {
        const sessionBuilder = new libsignal.sessionBuilder(this, address);

        try {
            await sessionBuilder.processPreKey(preKeyBundle);
            return true;
        } catch {
            return false;
        }
    }

    public getSignedPreKey = () => {
        const objKeys = Object.keys(this.store).filter((key) => key.startsWith("25519KeysignedKey"));
        const keys = objKeys.map((key) => this.store[key]).map(parseKeyObject);
        return keys[0];
    }

    public getPreKeys = () => {
        const objKeys = Object.keys(this.store).filter((key) => key.startsWith("25519KeypreKey"));
        const keys = objKeys.map((key) => this.store[key]).map(parseKeyObject);
        return keys;
    }

    public createPreKeys = async (preKeysAmount: number) => {
        const randomIds = generateId(preKeysAmount);
        const keyHelper = libsignal.KeyHelper;
        const preKeys = [];
        for (let i = 0; i < preKeysAmount; i++) {
            const preKey = await keyHelper.generatePreKey(randomIds[i]);
            preKeys.push(preKey);
            this.storePreKey(preKey.keyId, { ...preKey.keyPair, keyId: preKey.keyId });
        }
        return preKeys;

    }

    public loadSession = (identifier: string) => {
        return this.get(`session${identifier}`);
    }

    public storeSession = (identifier: string, record: any) => {
        return this.put(`session${identifier}`, record);
    }

    public removeSession = (identifier: string) => {
        return this.remove(`session${identifier}`);
    }

    public removeAllSessions = (identifier: string) => {
        for (const id in this.store) {
            if (id.startsWith(`session${identifier}`)) {
                delete this.store[id];
            }
        }
    }

    public isValidKeyPair = (keyPair: any) => {
        return (keyPair.pubKey && keyPair.privKey
            && typeof keyPair.pubKey === "string"
            && typeof keyPair.privKey === "string");
    }

    public setStore = (data: string) => {
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
                } else if (typeof store[i] === "string" && (i.startsWith("identityKey") || i.startsWith("session"))) {
                    this.put(i, store[i]);
                } else if (i === "registrationId" && Number.isInteger(store[i])) {
                    this.put(i, store[i]);
                } else if (i.startsWith("25519KeypreKey") || i.startsWith("25519KeysignedKey")) {
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
        } catch {
            return;
        }
    }

    public getStore = () => {
        if (!this.store.registrationId || !this.store.identityKey) {
            throw new Error("");
        }
        const json: any = {
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
    }

    public async init(storeHex?: string) {
        if (storeHex) {
            return this.setStore(storeHex);
        }
        const keyHelper = libsignal.KeyHelper;
        const registrationId = await keyHelper.generateRegistrationId();
        const identityKeyPair = await keyHelper.generateIdentityKeyPair();

        await this.createPreKeys(20);

        const signedPreKeyGenId = generateId()[0];
        const signedPreKeys = await keyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyGenId);

        const signedPreKey = {
            keyId: signedPreKeys.keyId,
            signature: signedPreKeys.signature,
            ...signedPreKeys.keyPair,
        };

        this.put("identityKey", identityKeyPair);
        this.put("registrationId", registrationId);

        this.storeSignedPreKey(signedPreKey.keyId, signedPreKey);
    }
}

export default LoafBreadbox;
