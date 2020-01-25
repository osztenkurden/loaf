import util from "util";
declare let window: any;
const libsignal = window.libsignal;

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

    public isTrustedIdentity = (identifier: any, identityKey: any, direction: any) => {
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
        return util.toString(identityKey) === util.toString(trusted);
    }

    public loadIdentityKey = (identifier: any) => {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        return this.get(`identityKey${identifier}`);
    }

    public saveIdentity = (identifier: any, identityKey: any) => {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");
        const address = new libsignal.SignalProtocolAddress.fromString(identifier);
        const existing = this.get(`identityKey${address.getName()}`);

        this.put(`identityKey${address.getName()}`, identityKey);

        if (existing && util.toString(identityKey) !== util.toString(existing)) {
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

    public loadStoreData = (data: string) => {

        const store = JSON.parse(data);
        for (const i in store) {
            if (typeof i !== "string") {
                throw new Error("");
            }

        }
    }
}
