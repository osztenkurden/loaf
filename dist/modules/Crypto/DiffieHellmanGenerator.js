"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const diffiehellman = crypto_1.default.createDiffieHellman(2048);
diffiehellman.generateKeys("hex");
const keyData = {
    generator: diffiehellman.getGenerator("hex"),
    prime: diffiehellman.getPrime("hex"),
    private: diffiehellman.getPrivateKey("hex"),
    public: diffiehellman.getPublicKey("hex"),
};
if (process && process.send) {
    process.send({ keys: keyData });
}
