import * as ArrayBuffers from "./../Breadbox/ArrayBuffer";
import Breadbox from "./../Breadbox/LoafBreadbox";
// tslint:disable-next-line:no-var-requires
const libsignal = require("./../Breadcrumb/libsignal/index");

interface IMessageObjectSending {
    type: string;
    content: string;
}

export default class Cypher {
    private store: Breadbox;

    constructor(store: Breadbox) {
        this.store = store;
    }

    public async decrypt(message: string, senderId: number, machineId: number, isFirst = false) {
        const original = Buffer.from(message, "hex").toString("ucs-2");

        const address = new libsignal.SignalProtocolAddress(senderId, machineId);
        const cipher = new libsignal.SessionCipher(this.store, address);

        if (isFirst) {
            const contentInit = await cipher.decryptPreKeyWhisperMessage(original, "binary");
            return Buffer.from(contentInit).toString();
        }
        const content = await cipher.decryptWhisperMessage(original, "binary");
        return Buffer.from(content).toString();
    }

    public async encrypt(message: IMessageObjectSending, recipientId: number, machineId: number, bundle?: any) {
        const content = this.encodeMessage(message);
        const address = new libsignal.SignalProtocolAddress(recipientId, machineId);

        if (bundle) {
            await this.store.createSession(address, bundle);
        }

        const cipher = new libsignal.SessionCipher(this.store, address);
        const ciphered = await cipher.encrypt(content);
        ciphered.body = Buffer.from(ciphered.body, "ucs-2").toString("hex");
        return ciphered;
    }

    private encodeMessage(message: IMessageObjectSending) {
        const text = JSON.stringify(message);
        return ArrayBuffers.create(Buffer.from(text));
    }
}
