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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var LoafAPI_1 = require("./../API/LoafAPI");
var API_1 = require("./../API");
var Machine = __importStar(require("./../Machine"));
var User_1 = __importDefault(require("./../User"));
var Loaf = __importStar(require("./handler"));
function initSockets() {
    var _this = this;
    var socketOpts = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Cookie: LoafAPI_1.getCookie()
                }
            }
        }
    };
    var socket = socket_io_client_1["default"]("http://localhost:5000", socketOpts);
    socket.on("disconnect", function () {
        console.log("DISCONNECTION");
    });
    socket.on("connect", function () {
        console.log("CONNECTED TO SERVER");
    });
    socket.on("disconnection", function () {
        console.log("DISCONNECTION #2");
    });
    socket.on("chat", function () {
        console.log("CHATS");
        var inbox = User_1["default"].getInbox();
        if (inbox) {
            inbox.loadChats();
        }
    });
    socket.on("message", function (data) { return __awaiter(_this, void 0, void 0, function () {
        var inbox;
        return __generator(this, function (_a) {
            console.log("messages");
            inbox = User_1["default"].getInbox();
            if (inbox && data.chatId) {
                inbox.loadMessages(data.chatId);
            }
            return [2 /*return*/];
        });
    }); });
}
exports.initSockets = initSockets;
exports.start = function (win) {
    User_1["default"].assign(win);
    // TODO: remove unnecessary event responses
    Loaf.on("getMachineId", function () {
        var machineId = Machine.getMachineId();
        return { event: "getMachineId", data: machineId };
    });
    Loaf.on("getUser", function () {
        return { event: "user", data: User_1["default"].getUser() };
    });
    Loaf.on("getCookie", function () {
        return { event: "cookie", data: LoafAPI_1.getCookie() };
    });
    Loaf.onAsync("loadImage", function (chatId) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, API_1.api.chats.loadImage(chatId)];
                case 1:
                    res = _a.sent();
                    if (!res.data || !res.data.image) {
                        return [2 /*return*/, { event: "imageLoaded", data: { id: chatId, image: null } }];
                    }
                    return [2 /*return*/, { event: "imageLoaded", data: { id: chatId, image: res.data.image } }];
            }
        });
    }); });
    Loaf.onAsync("addUser", function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var inbox, response, data, id;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inbox = User_1["default"].getInbox();
                    if (!(typeof userId === "number")) return [3 /*break*/, 2];
                    return [4 /*yield*/, inbox.addFriend(userId)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, API_1.api.user.getByName(userId)];
                case 3:
                    response = _b.sent();
                    data = response.data;
                    if (!data) {
                        return [2 /*return*/, { event: "userAdded", data: false }];
                    }
                    id = (_a = data.user) === null || _a === void 0 ? void 0 : _a.id;
                    if (!Number.isInteger(id)) {
                        return [2 /*return*/, { event: "userAdded", data: false }];
                    }
                    return [4 /*yield*/, inbox.addFriend(id)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, { event: "userAdded", data: true }];
            }
        });
    }); });
    Loaf.onAsync("createChatTest", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, API_1.api.inbox.createTestChat()];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/, { event: 'createdChat', data: response.data }];
            }
        });
    }); });
    Loaf.onAsync("getUserByName", function (name) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, API_1.api.user.getByName(name)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, { event: "userData", data: response.data }];
            }
        });
    }); });
    Loaf.onAsync("acceptChat", function (chatId) { return __awaiter(void 0, void 0, void 0, function () {
        var inbox, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inbox = User_1["default"].getInbox();
                    return [4 /*yield*/, inbox.acceptChat(chatId)];
                case 1:
                    result = _a.sent();
                    if (!result) return [3 /*break*/, 3];
                    return [4 /*yield*/, inbox.loadChats()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, { event: "acceptInvitation", data: null }];
            }
        });
    }); });
    Loaf.onAsync("getChats", function () { return __awaiter(void 0, void 0, void 0, function () {
        var inbox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inbox = User_1["default"].getInbox();
                    return [4 /*yield*/, inbox.loadChats()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { event: "chatsLoaded", data: true }];
            }
        });
    }); });
    Loaf.onAsync("sendMessage", function (chatId, message) { return __awaiter(void 0, void 0, void 0, function () {
        var inbox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inbox = User_1["default"].getInbox();
                    return [4 /*yield*/, inbox.sendToChat(chatId, message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, null];
            }
        });
    }); });
    Loaf.onAsync("register", function (username, password, name) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1["default"].register(username, password, name)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, { event: "userCreated", data: result }];
            }
        });
    }); });
    Loaf.onAsync("authenticateUser", function (authCode) { return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1["default"].authenticate(authCode)];
                case 1:
                    status = _a.sent();
                    return [2 /*return*/, { event: "userStatus", data: status }];
            }
        });
    }); });
    Loaf.onAsync("logInUser", function (username, password) { return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1["default"].logIn(username, password)];
                case 1:
                    status = _a.sent();
                    return [2 /*return*/, { event: "userStatus", data: status }];
            }
        });
    }); });
    Loaf.onAsync("loadUser", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1["default"].loadUser()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { event: "user", data: User_1["default"].getUser() }];
            }
        });
    }); });
    var devMode = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (process.env.DEVUSER1) {
                User_1["default"].register('osztenkurden', 'LeMoni@da1', 'Hubert');
            }
            if (process.env.DEVUSER2) {
                User_1["default"].register('hubertwalczak8', 'LeMoni@da1', 'Hubert');
            }
            if (process.env.DEVUSER3) {
                User_1["default"].register('oszten', 'LeMoni@da1', 'Hubert');
            }
            return [2 /*return*/];
        });
    }); };
    devMode();
};
