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
const ArrayBuffers = __importStar(require("./../Breadbox/ArrayBuffer"));
// tslint:disable-next-line:no-var-requires
const libsignal = require("./../Breadcrumb/libsignal/index");
class Cypher {
    constructor(store) {
        this.store = store;
    }
    decrypt(message, senderId, machineId, isFirst = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const original = Buffer.from(message, "base64").toString("ucs-2");
            const address = new libsignal.SignalProtocolAddress(senderId, machineId);
            const cipher = new libsignal.SessionCipher(this.store, address);
            let decrypted;
            if (isFirst) {
                const contentInit = yield cipher.decryptPreKeyWhisperMessage(original, "binary");
                decrypted = Buffer.from(contentInit).toString();
            }
            else {
                const content = yield cipher.decryptWhisperMessage(original, "binary");
                decrypted = Buffer.from(content).toString();
            }
            try {
                return JSON.parse(decrypted);
            }
            catch (_a) {
                return null;
            }
        });
    }
    encrypt(message, recipientId, machineId, bundle) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = this.encodeMessage(message);
            const address = new libsignal.SignalProtocolAddress(recipientId, machineId);
            if (bundle) {
                yield this.store.createSession(address, bundle);
            }
            const cipher = new libsignal.SessionCipher(this.store, address);
            const ciphered = yield cipher.encrypt(content);
            ciphered.body = Buffer.from(ciphered.body, "ucs-2").toString("base64");
            ciphered.content = ciphered.body;
            ciphered.recipientId = recipientId;
            ciphered.machineId = machineId;
            ciphered.entry = ciphered.type == 3;
            return ciphered;
        });
    }
    encodeMessage(message) {
        const text = JSON.stringify(message);
        return ArrayBuffers.create(Buffer.from(text));
    }
}
exports.default = Cypher;
