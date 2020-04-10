import * as ArrayBuffers from "./../Breadbox/ArrayBuffer";
import Breadbox from "./../Breadbox/LoafBreadbox";
import * as I from "./../interface";
// tslint:disable-next-line:no-var-requires
const libsignal = require("./../Breadcrumb/libsignal/index");

export default class Cypher {
    private store: Breadbox;

    constructor(store: Breadbox) {
        this.store = store;
    }

    public async decrypt(message: string, senderId: number, machineId: number, isFirst = false) {
        const original = Buffer.from(message, "hex").toString("ucs-2");

        const address = new libsignal.SignalProtocolAddress(senderId, machineId);
        const cipher = new libsignal.SessionCipher(this.store, address);

        let decrypted;

        if (isFirst) {
            const contentInit = await cipher.decryptPreKeyWhisperMessage(original, "binary");
            decrypted = Buffer.from(contentInit).toString();
        } else {
            const content = await cipher.decryptWhisperMessage(original, "binary");
            decrypted = Buffer.from(content).toString();
        }
        try {
            return JSON.parse(decrypted) as I.IMessageContent;
        } catch {
            return null;
        }
    }

    public async encrypt(message: I.IMessageContent, recipientId: number, machineId: number, bundle?: I.IPreKeyBundle) {
        const content = this.encodeMessage(message);
        const address = new libsignal.SignalProtocolAddress(recipientId, machineId);

        if (bundle) {
            console.log("We create the session");
            await this.store.createSession(address, bundle);
        }

        const cipher = new libsignal.SessionCipher(this.store, address);
        const ciphered: I.ISignalEncrypted = await cipher.encrypt(content);
        ciphered.body = Buffer.from(ciphered.body, "ucs-2").toString("hex");
        ciphered.content = ciphered.body;
        ciphered.recipientId = recipientId;
        ciphered.machineId = machineId;
        ciphered.entry = ciphered.type == 3;
        
        return ciphered;
    }

    private encodeMessage(message: I.IMessageContent) {
        const text = JSON.stringify(message);
        return ArrayBuffers.create(Buffer.from(text));
    }
}
