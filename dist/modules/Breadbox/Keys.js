"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var ArrBuffer = __importStar(require("./ArrayBuffer"));
exports.toString = function (key) { return Buffer.from(key).toString("hex"); };
exports.toArrayBuffer = function (key) {
    var buffer = Buffer.from(key, "hex");
    return ArrBuffer.create(buffer);
};
exports.stringify = function (keyPair) {
    var response = {
        privKey: exports.toString(keyPair.privKey),
        pubKey: exports.toString(keyPair.pubKey)
    };
    return response;
};
exports.bufferify = function (keyPair) {
    return {
        privKey: exports.toArrayBuffer(keyPair.privKey),
        pubKey: exports.toArrayBuffer(keyPair.pubKey)
    };
};
