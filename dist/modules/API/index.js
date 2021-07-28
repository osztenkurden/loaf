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
exports.api = void 0;
const LoafAPI_1 = __importDefault(require("./LoafAPI"));
exports.api = {
    inbox: {
        accept: (payload) => LoafAPI_1.default("chats/users", "PATCH", { messages: payload, chatId: payload.chatId }),
        addFriend: (userId) => LoafAPI_1.default("chats?private=true", "POST", { name: "", users: [userId] }),
        getChats: () => LoafAPI_1.default("chats"),
        createGroup: (name, users) => LoafAPI_1.default("chats", "POST", { name, users }),
        getReceivers: (chatId) => LoafAPI_1.default(`machines/${chatId}`),
    },
    chats: {
        loadImage: (chatId) => LoafAPI_1.default(`chats/image/base64?chatId=${chatId}`)
    },
    messages: {
        get: (chatId, machineId) => LoafAPI_1.default(`messages/${chatId}?machineId=${machineId}`),
        send: (chatId, entries, senderMachine) => LoafAPI_1.default(`messages/${chatId}`, "POST", { chatId, entries, senderMachine }),
    },
    user: {
        authenticate: (authcode, machineName) => LoafAPI_1.default("auth/auth", "POST", { authcode, machineName }),
        get: () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield LoafAPI_1.default("auth");
            if (res.data && res.success) {
                return res.data;
            }
            return null;
        }),
        getByName: (name) => LoafAPI_1.default(`user/${name}`),
        getBundle: (userId) => LoafAPI_1.default("keys/bundle", "POST", { userId }),
        // tslint:disable-next-line:max-line-length
        login: (body) => LoafAPI_1.default("auth/login", "POST", body),
        register: (payload) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield LoafAPI_1.default("auth/register", "POST", payload);
            if (!response.success) {
                return null;
            }
            if (response.data && response.data.publicKey) {
                response.data.publicKey = Buffer.from(response.data.publicKey, "hex");
            }
            return response.data;
        }),
    },
};
