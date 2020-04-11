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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var LoafAPI_1 = __importDefault(require("./LoafAPI"));
exports.api = {
    inbox: {
        accept: function (payload) { return LoafAPI_1["default"]("chats/users", "PATCH", { messages: payload, chatId: payload.chatId }); },
        addFriend: function (userId) { return LoafAPI_1["default"]("chats?private=true", "POST", { name: "", users: [userId] }); },
        getChats: function () { return LoafAPI_1["default"]("chats"); },
        createTestChat: function () { return LoafAPI_1["default"]("chats", "POST", { name: "Bakery", users: [1, 2, 3] }); },
        getReceivers: function (chatId) { return LoafAPI_1["default"]("machines/" + chatId); }
    },
    messages: {
        get: function (chatId, machineId) { return LoafAPI_1["default"]("messages/" + chatId + "?machineId=" + machineId); },
        send: function (chatId, entries, senderMachine) {
            return LoafAPI_1["default"]("messages/" + chatId, "POST", { chatId: chatId, entries: entries, senderMachine: senderMachine });
        }
    },
    user: {
        authenticate: function (authcode, machineName) { return LoafAPI_1["default"]("auth/auth", "POST", { authcode: authcode, machineName: machineName }); },
        get: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LoafAPI_1["default"]("auth")];
                    case 1:
                        res = _a.sent();
                        if (res.data && res.success) {
                            return [2 /*return*/, res.data];
                        }
                        return [2 /*return*/, null];
                }
            });
        }); },
        getByName: function (name) { return LoafAPI_1["default"]("user/" + name); },
        getBundle: function (userId) { return LoafAPI_1["default"]("keys/bundle", "POST", { userId: userId }); },
        // tslint:disable-next-line:max-line-length
        login: function (body) { return LoafAPI_1["default"]("auth/login", "POST", body); },
        register: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LoafAPI_1["default"]("auth/register", "POST", payload)];
                    case 1:
                        response = _a.sent();
                        if (!response.success) {
                            return [2 /*return*/, null];
                        }
                        if (response.data && response.data.publicKey) {
                            response.data.publicKey = Buffer.from(response.data.publicKey, "hex");
                        }
                        return [2 /*return*/, response.data];
                }
            });
        }); }
    }
};
