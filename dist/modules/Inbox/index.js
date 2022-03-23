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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_1 = require("../API");
const Database_1 = require("../Database");
const Machine = __importStar(require("../Machine"));
const uuid_1 = require("uuid");
const electron_1 = require("electron");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const references_1 = require("../Database/references");
// import * as Machine from "../Machine";
class Inbox {
    constructor(content, userId, storage) {
        this.addFriend = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield API_1.api.inbox.addFriend(userId);
            return this;
        });
        this.loadChats = (init) => __awaiter(this, void 0, void 0, function* () {
            const response = yield API_1.api.inbox.getChats();
            if (response.success && response.data) {
                const chats = response.data.chats;
                for (const chat of chats) {
                    const newestPage = yield Database_1.getMessages(this.userId, chat.id, 0, chats);
                    // const inboxedMessages = this.messages.get(chat.id);
                    // const savedMessages = init ? (await getMessages(this.userId, chat.id, 0, chats)).messages : [];
                    this.messages.set(chat.id, newestPage.messages);
                    chat.pages = [newestPage];
                }
                this.chats = chats;
            }
            this.content.send("chats", this.chats);
            if (init) {
                this.loadAllMessages();
            }
            // Loaf.send("chats", this.chats);
            return this;
        });
        this.loadMessagesFromPage = (chatId, page) => __awaiter(this, void 0, void 0, function* () {
            const chat = this.chats.find(entry => entry.id === chatId);
            if (!chat)
                return;
            const pageEntry = yield Database_1.getMessages(this.userId, chatId, page, [], true);
            this.content.send("chatPage", { chatId, pageEntry });
        });
        this.chats = [];
        this.content = content;
        this.userId = userId;
        this.storage = storage;
        this.messages = new Map();
        this.loadChats(true);
    }
    sendToChat(chatId, msg, localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const receivers = yield this.getReceivers(chatId);
            const entries = [];
            for (const receiver of receivers) {
                const payload = {
                    content: msg,
                    machineId: receiver.machineId,
                    recipientId: receiver.userId,
                };
                const entry = yield this.prepareMessage(payload);
                if (entry)
                    entries.push(entry);
            }
            const result = yield API_1.api.messages.send(chatId, entries, Machine.getMachineId());
            if (result.success) {
                const messageInput = {
                    uuid: uuid_1.v4(),
                    senderId: this.userId,
                    content: msg,
                    chatId,
                    my: true,
                    date: (new Date()).toISOString(),
                };
                yield Database_1.saveFileToDrive(messageInput);
                yield references_1.saveMessageReferences([messageInput]);
                const current = this.messages.get(chatId) || [];
                const message = Object.assign(Object.assign({}, messageInput), { content: yield Database_1.parseContent(messageInput.content) });
                current.push(message);
                this.messages.set(chatId, current);
                this.content.send("chats", this.chats, localUUID);
                yield Database_1.saveMessages(this.userId, [messageInput]);
            }
            else {
                console.log(result);
            }
            return result;
        });
    }
    acceptChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const receivers = yield this.getReceivers(chatId);
            if (!receivers.length) {
                return false;
            }
            const messages = [];
            const machineId = Machine.getMachineId();
            for (const machine of receivers) {
                const message = yield this.storage.createSession(machine);
                if (typeof message !== "boolean") {
                    messages.push(message);
                }
            }
            const payload = {
                chatId,
                entries: messages,
                senderId: this.userId,
                senderMachine: machineId,
            };
            const result = yield API_1.api.inbox.accept(payload);
            console.log(result);
            if (result.success) {
                this.loadChats();
                return true;
            }
            return false;
        });
    }
    loadAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const chat of this.chats) {
                yield this.loadMessages(chat.id, true);
            }
            this.loadChats();
        });
    }
    loadMessages(chatId, init = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!init)
                yield this.loadChats();
            const response = yield API_1.api.messages.get(chatId, Machine.getMachineId());
            if (!response.success || !response.data) {
                return null;
            }
            const messages = (response.data.messages || []);
            const current = this.messages.get(chatId) || [];
            const incoming = [];
            const decryptedMessages = [];
            for (const rawMessage of messages) {
                const decrypted = yield this.storage.decodeMessage(rawMessage);
                if (!decrypted) {
                    continue;
                }
                const date = rawMessage.createdAt;
                const message = {
                    uuid: uuid_1.v4(),
                    chatId,
                    content: decrypted,
                    date,
                    my: rawMessage.senderId === this.userId,
                    senderId: rawMessage.senderId,
                    sender: this.getSenderData(chatId, rawMessage.senderId),
                };
                yield Database_1.saveFileToDrive(message);
                decryptedMessages.push(message);
            }
            yield Database_1.saveMessages(this.userId, decryptedMessages);
            yield references_1.saveMessageReferences(decryptedMessages);
            for (const decryptedMessage of decryptedMessages) {
                const message = Object.assign(Object.assign({}, decryptedMessage), { content: yield Database_1.parseContent(decryptedMessage.content) });
                current.push(message);
                incoming.push(message);
            }
            this.messages.set(chatId, current);
            if (!init)
                yield this.loadChats();
            const window = electron_1.BrowserWindow.fromWebContents(this.content);
            if (!window || window.isFocused())
                return;
            if (window.isVisible()) {
                window.flashFrame(true);
                return;
            }
            for (const message of incoming) {
                if (!message.sender)
                    continue;
                const chat = this.chats.find(chat => chat.id === message.chatId);
                if (!chat)
                    continue;
                const iconPath = path_1.default.join(Machine.directories.images, `${chat.id}.png`);
                const icon = fs_1.existsSync(iconPath) ? iconPath : undefined;
                const notification = new electron_1.Notification({ title: chat.name, body: `${message.sender.username} sent new message`, icon });
                notification.on('click', () => {
                    window.show();
                    window.focus();
                });
                notification.show();
            }
        });
    }
    getSenderData(chatId, senderId, chats = []) {
        const chat = this.chats.find(chatEntry => chatEntry.id === chatId) || chats.find(chatEntry => chatEntry.id === chatId);
        if (!chat)
            return undefined;
        const senderData = chat.users.find(user => user.id === senderId);
        if (!senderData || !senderData.id)
            return undefined;
        return {
            id: senderData.id,
            username: senderData.username
        };
    }
    prepareMessage(msg, bundle) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = yield this.storage.encodeMessage(msg.content, msg.recipientId, msg.machineId, bundle);
            return encrypted;
        });
    }
    getReceivers(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield API_1.api.inbox.getReceivers(chatId);
            if (!response.status || !response.data) {
                return [];
            }
            // const store = this.storage.getStore();
            const machineId = Machine.getMachineId();
            const machines = response.data.machines;
            if (!machines) {
                console.log(response);
                return [];
            }
            const receivers = machines.filter((mch) => mch.userId !== this.userId || mch.machineId !== machineId);
            return receivers;
        });
    }
}
exports.default = Inbox;
