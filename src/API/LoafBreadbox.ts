import * as Keys from "./Keys";
// import util from "util";

declare let window: any;
const libsignal = window.libsignal;

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
        return this.get("identityKey");
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

    public saveIdentity = (identifier: any, identityKey: ArrayBuffer) => {
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

    public createSession = async (address: any, preKeyBundle: any) => {
        const sessionBuilder = new libsignal.sessionBuilder(this, address);

        try {
            await sessionBuilder.processPreKey(preKeyBundle);
            return true;
        } catch {
            return false;
        }
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
            return null;
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
}

export default LoafBreadbox;
