import * as ArrayBuffers from "./../Breadbox/ArrayBuffer";
import Breadbox from "./../Breadbox/LoafBreadbox";
// tslint:disable-next-line:no-var-requires
const libsignal = require("./../Breadcrumb/libsignal/index");

interface IMessageObjectIncoming {
    senderId: number;
    recipientId: number;
    machineId: number;
    message: string;
    isFirst?: boolean;
}

interface IMessageObjectSending {
    senderId: number;
    recipientId: number;
    machineId: number;
    message: {
        type: string;
        content: string;
    };
    type: string;
    content: string;
    bundle?: any;
}

export default class Cypher {
    private store: Breadbox;

    constructor(store: Breadbox) {
        this.store = store;
    }

    public async decrypt(message: IMessageObjectIncoming) {
        const original = Buffer.from(message.message, "hex").toString("ucs-2");

        const address = new libsignal.SignalProtocolAddress(message.senderId, message.machineId);
        const cipher =  new libsignal.SessionCipher(this.store, address);

        if (message.isFirst) {
            const contentInit = await cipher.decryptPreKeyWhisperMessage(original, "binary");
            return Buffer.from(contentInit).toString();
        }
        const content = await cipher.decryptWhisperMessage(original, "binary");
        return Buffer.from(content).toString();
    }

    public async encrypt(message: IMessageObjectSending) {
        const content = this.encodeMessage(message);
        const address = new libsignal.SignalProtocolAddress(message.recipientId, message.machineId);

        if (message.bundle) {
            await this.store.createSession(address, message.bundle);
        }

        const cipher = new libsignal.SessionCipher(this.store, address);
        const ciphered = await cipher.encrypt(content);
        ciphered.body = Buffer.from(ciphered.body, "ucs-2").toString("hex");
        return ciphered;
    }

    private encodeMessage(message: IMessageObjectSending) {
        const text = JSON.stringify(message.message);
        return ArrayBuffers.create(Buffer.from(text));
    }
}
