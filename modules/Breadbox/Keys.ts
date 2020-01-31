import * as ArrBuffer from "./ArrayBuffer";

export const toString = (key: Buffer | ArrayBuffer) => Buffer.from(key).toString("hex");

export const toArrayBuffer = (key: string) => {
    const buffer = Buffer.from(key,  "hex");
    return ArrBuffer.create(buffer);
};

export const stringify = (keyPair: { privKey: Buffer, pubKey: Buffer }) => {
    const response = {
        privKey: toString(keyPair.privKey),
        pubKey: toString(keyPair.pubKey),
    };
    return response;
};

export const bufferify = (keyPair: { privKey: string, pubKey: string }) => {
    return {
        privKey: toArrayBuffer(keyPair.privKey),
        pubKey: toArrayBuffer(keyPair.pubKey),
    };
};
