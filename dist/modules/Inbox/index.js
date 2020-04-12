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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var API_1 = require("../API");
var Machine = __importStar(require("../Machine"));
// import * as Machine from "../Machine";
var Inbox = /** @class */ (function () {
    function Inbox(content, userId, storage) {
        var _this = this;
        this.addFriend = function (userId) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.inbox.addFriend(userId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this];
                }
            });
        }); };
        this.loadChats = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, chats, _i, chats_1, chat, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.inbox.getChats()];
                    case 1:
                        response = _a.sent();
                        if (response.success && response.data) {
                            chats = response.data.chats;
                            for (_i = 0, chats_1 = chats; _i < chats_1.length; _i++) {
                                chat = chats_1[_i];
                                messages = this.messages.get(chat.id);
                                if (!messages) {
                                    this.messages.set(chat.id, []);
                                    messages = [];
                                }
                                chat.messages = messages;
                            }
                            this.chats = chats;
                        }
                        this.content.send("chats", this.chats);
                        // Loaf.send("chats", this.chats);
                        return [2 /*return*/, this];
                }
            });
        }); };
        this.chats = [];
        this.content = content;
        this.userId = userId;
        this.storage = storage;
        this.messages = new Map();
        this.loadChats();
    }
    Inbox.prototype.sendToChat = function (chatId, msg) {
        return __awaiter(this, void 0, void 0, function () {
            var receivers, entries, _i, receivers_1, receiver, payload, entry, message, result, current;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getReceivers(chatId)];
                    case 1:
                        receivers = _a.sent();
                        entries = [];
                        _i = 0, receivers_1 = receivers;
                        _a.label = 2;
                    case 2:
                        if (!(_i < receivers_1.length)) return [3 /*break*/, 5];
                        receiver = receivers_1[_i];
                        payload = {
                            content: msg,
                            machineId: receiver.machineId,
                            recipientId: receiver.userId
                        };
                        return [4 /*yield*/, this.prepareMessage(payload)];
                    case 3:
                        entry = _a.sent();
                        entries.push(entry);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        message = {
                            senderId: this.userId,
                            content: msg,
                            chatId: chatId,
                            my: true,
                            date: (new Date()).toISOString()
                        };
                        return [4 /*yield*/, API_1.api.messages.send(chatId, entries, Machine.getMachineId())];
                    case 6:
                        result = _a.sent();
                        if (result.success) {
                            current = this.messages.get(chatId);
                            current.push(message);
                            this.messages.set(chatId, current);
                            this.content.send("chats", this.chats);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Inbox.prototype.acceptChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var receivers, messages, machineId, _i, receivers_2, machine, message, payload, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getReceivers(chatId)];
                    case 1:
                        receivers = _a.sent();
                        console.log('RECEIVERS:');
                        console.log(receivers);
                        if (!receivers.length) {
                            return [2 /*return*/, false];
                        }
                        messages = [];
                        machineId = Machine.getMachineId();
                        _i = 0, receivers_2 = receivers;
                        _a.label = 2;
                    case 2:
                        if (!(_i < receivers_2.length)) return [3 /*break*/, 5];
                        machine = receivers_2[_i];
                        return [4 /*yield*/, this.storage.createSession(machine)];
                    case 3:
                        message = _a.sent();
                        console.log('message for ' + machine.userId + '-' + machine.machineId);
                        console.log(message);
                        if (typeof message !== "boolean") {
                            messages.push(message);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        payload = {
                            chatId: chatId,
                            entries: messages,
                            senderId: this.userId,
                            senderMachine: machineId
                        };
                        return [4 /*yield*/, API_1.api.inbox.accept(payload)];
                    case 6:
                        result = _a.sent();
                        if (result.success) {
                            this.loadChats();
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Inbox.prototype.loadMessages = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, messages, current, _i, messages_1, rawMessage, decrypted, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadChats()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, API_1.api.messages.get(chatId, Machine.getMachineId())];
                    case 2:
                        response = _a.sent();
                        if (!response.success || !response.data) {
                            return [2 /*return*/, null];
                        }
                        messages = (response.data.messages || []);
                        console.log(messages);
                        current = this.messages.get(chatId) || [];
                        _i = 0, messages_1 = messages;
                        _a.label = 3;
                    case 3:
                        if (!(_i < messages_1.length)) return [3 /*break*/, 6];
                        rawMessage = messages_1[_i];
                        return [4 /*yield*/, this.storage.decodeMessage(rawMessage)];
                    case 4:
                        decrypted = _a.sent();
                        if (!decrypted) {
                            return [3 /*break*/, 5];
                        }
                        message = {
                            chatId: chatId,
                            content: decrypted,
                            date: (new Date()).toISOString(),
                            my: rawMessage.senderId === this.userId,
                            senderId: rawMessage.senderId,
                            sender: rawMessage.sender
                        };
                        current.push(message);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.messages.set(chatId, current);
                        this.loadChats();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inbox.prototype.prepareMessage = function (msg, bundle) {
        return __awaiter(this, void 0, void 0, function () {
            var encrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.encodeMessage(msg.content, msg.recipientId, msg.machineId, bundle)];
                    case 1:
                        encrypted = _a.sent();
                        return [2 /*return*/, encrypted];
                }
            });
        });
    };
    Inbox.prototype.getReceivers = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, store, machineId, machines, receivers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.inbox.getReceivers(chatId)];
                    case 1:
                        response = _a.sent();
                        if (!response.status || !response.data) {
                            return [2 /*return*/, []];
                        }
                        store = this.storage.getStore();
                        machineId = Machine.getMachineId();
                        machines = response.data.machines;
                        receivers = machines.filter(function (mch) { return mch.userId !== _this.userId || mch.machineId !== machineId; });
                        return [2 /*return*/, receivers];
                }
            });
        });
    };
    return Inbox;
}());
exports["default"] = Inbox;
