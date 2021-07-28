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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferify = exports.stringify = exports.toArrayBuffer = exports.toString = void 0;
const ArrBuffer = __importStar(require("./ArrayBuffer"));
const toString = (key) => Buffer.from(key).toString("hex");
exports.toString = toString;
const toArrayBuffer = (key) => {
    const buffer = Buffer.from(key, "hex");
    return ArrBuffer.create(buffer);
};
exports.toArrayBuffer = toArrayBuffer;
const stringify = (keyPair) => {
    const response = {
        privKey: exports.toString(keyPair.privKey),
        pubKey: exports.toString(keyPair.pubKey),
    };
    return response;
};
exports.stringify = stringify;
const bufferify = (keyPair) => {
    return {
        privKey: exports.toArrayBuffer(keyPair.privKey),
        pubKey: exports.toArrayBuffer(keyPair.pubKey),
    };
};
exports.bufferify = bufferify;
