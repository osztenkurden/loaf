"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeys = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const generateKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((res, rej) => {
        if (process.env.DEVUSER1) {
            const keys = {
                token: 'JBSWY3DPEHPK3PXP'
            };
            return res(keys);
        }
        if (process.env.DEVUSER2) {
            const keys = {
                token: 'JBSWY3DPEHPK3PXX'
            };
            return res(keys);
        }
        if (process.env.DEVUSER3) {
            const keys = {
                token: 'JBSWY3DPEHPK3PXY'
            };
            return res(keys);
        }
        const diffieHellman = child_process_1.fork(path_1.default.join(__dirname, "DiffieHellmanGenerator.js"));
        diffieHellman.on("message", (msg) => {
            res(msg.keys);
        });
        diffieHellman.on("exit", () => {
            res(null);
        });
    });
});
exports.generateKeys = generateKeys;
