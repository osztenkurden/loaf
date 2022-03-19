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
exports.start = exports.initSockets = void 0;
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const LoafAPI_1 = require("./../API/LoafAPI");
const API_1 = require("./../API");
const Machine = __importStar(require("./../Machine"));
const User_1 = __importDefault(require("./../User"));
const Loaf = __importStar(require("./handler"));
const call = {
    caller: null,
    status: null,
};
function initSockets() {
    const socketOpts = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Cookie: LoafAPI_1.getCookie(),
                },
            },
        },
        rejectUnauthorized: false,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 2000,
    };
    console.log("CONNECTION IS TRYING TO BE MADE");
    const socket = socket_io_client_1.default("https://loaf.bakerysoft.pl", socketOpts);
    socket.on('error', (err) => {
        console.log(err);
    });
    const rejectCall = () => {
        socket.emit('reject-call');
        call.caller = null;
        call.status = null;
    };
    socket.on("disconnect", () => {
        console.log("DISCONNECTION");
    });
    socket.on("connect", () => {
        console.log("CONNECTED TO SERVER");
    });
    socket.on("disconnection", () => {
        console.log("DISCONNECTION #2");
    });
    socket.on("chat", () => {
        const inbox = User_1.default.getInbox();
        if (inbox) {
            inbox.loadChats();
        }
    });
    /**
     * Events from server: call-rejected, call-offer, call-failed
     */
    socket.on('call-offer', (data) => {
        if (!User_1.default.window || (call.caller && call.caller !== data.target))
            return;
        User_1.default.window.send('call-offer', data);
        call.caller = data.target;
        call.status = data.type === 'accept' ? 'ongoing' : 'incoming';
    });
    socket.on('call-rejected', () => {
        if (!User_1.default.window || !call.caller)
            return;
        User_1.default.window.send('call-rejected');
        call.caller = null;
        call.status = null;
    });
    socket.on('call-failed', () => {
        if (!User_1.default.window)
            return;
        User_1.default.window.send('call-failed');
        call.caller = null;
        call.status = null;
    });
    Loaf.onAsync("call-to-user", (data) => __awaiter(this, void 0, void 0, function* () {
        socket.emit('call-to-user', data);
        console.log('sending to user', data.target);
        //below uninportant
        return { event: "called-to-user", data: null };
    }));
    Loaf.onAsync("exchange-offer", (data) => __awaiter(this, void 0, void 0, function* () {
        socket.emit('exchange-offer', data);
        //below uninportant
        return { event: "exchanged-offer", data: null };
    }));
    Loaf.onAsync("accept-call", (data) => __awaiter(this, void 0, void 0, function* () {
        socket.emit('accept-call', data);
        //below uninportant
        return { event: "accepted-call", data: null };
    }));
    Loaf.onAsync("reject-call", () => __awaiter(this, void 0, void 0, function* () {
        rejectCall();
        //below uninportant
        return { event: "call-rejection", data: null };
    }));
    socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
        const inbox = User_1.default.getInbox();
        if (inbox && data.chatId) {
            inbox.loadMessages(data.chatId);
        }
    }));
}
exports.initSockets = initSockets;
const start = (win) => {
    User_1.default.assign(win);
    // TODO: remove unnecessary event responses
    Loaf.on("getMachineId", () => {
        const machineId = Machine.getMachineId();
        return { event: "getMachineId", data: machineId };
    });
    Loaf.on("getUser", () => {
        return { event: "user", data: User_1.default.getUser() };
    });
    Loaf.on("getCookie", () => {
        return { event: "cookie", data: LoafAPI_1.getCookie() };
    });
    Loaf.onAsync("loadImage", (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield API_1.api.chats.loadImage(chatId);
        if (!res.data || !res.data.image) {
            return { event: "imageLoaded", data: { id: chatId, image: null } };
        }
        return { event: "imageLoaded", data: { id: chatId, image: res.data.image } };
    }));
    Loaf.onAsync("addUser", (userId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const inbox = User_1.default.getInbox();
        if (!inbox)
            return { event: "userAdded", data: false };
        if (typeof userId === "number") {
            yield inbox.addFriend(userId);
        }
        else {
            const response = yield API_1.api.user.getByName(userId);
            const data = response.data;
            if (!data) {
                return { event: "userAdded", data: false };
            }
            const id = (_a = data.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!Number.isInteger(id)) {
                return { event: "userAdded", data: false };
            }
            yield inbox.addFriend(id);
        }
        return { event: "userAdded", data: true };
    }));
    Loaf.onAsync("createGroup", (name, users) => __awaiter(void 0, void 0, void 0, function* () {
        const user = User_1.default.getUser();
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return null;
        if (!users.includes(user.id)) {
            users.push(user.id);
        }
        const response = yield API_1.api.inbox.createGroup(name, users);
        return { event: 'createdChat', data: response.data };
    }));
    Loaf.onAsync("getUserByName", (name) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield API_1.api.user.getByName(name);
        return { event: "userData", data: response.data };
    }));
    Loaf.onAsync("acceptChat", (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const inbox = User_1.default.getInbox();
        if (!inbox) {
            return { event: "acceptInvitation", data: false };
        }
        const result = yield inbox.acceptChat(chatId);
        if (result) {
            yield inbox.loadChats();
        }
        return { event: "acceptInvitation", data: null };
    }));
    Loaf.onAsync("getChats", () => __awaiter(void 0, void 0, void 0, function* () {
        const inbox = User_1.default.getInbox();
        if (!inbox) {
            return { event: "chatsLoaded", data: false };
        }
        yield inbox.loadChats();
        return { event: "chatsLoaded", data: true };
    }));
    Loaf.onAsync("loadPageOfMessages", (chatId, page) => __awaiter(void 0, void 0, void 0, function* () {
        const inbox = User_1.default.getInbox();
        if (!inbox) {
            return { event: "loadedPage", data: false };
        }
        yield inbox.loadMessagesFromPage(chatId, page);
        return { event: "loadedPage", data: true };
    }));
    Loaf.onAsync("sendMessage", (chatId, message) => __awaiter(void 0, void 0, void 0, function* () {
        const inbox = User_1.default.getInbox();
        yield (inbox === null || inbox === void 0 ? void 0 : inbox.sendToChat(chatId, message));
        return null;
    }));
    Loaf.onAsync("register", (username, password, name) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield User_1.default.register(username, password, name);
        return { event: "userCreated", data: result };
    }));
    Loaf.onAsync("authenticateUser", (authCode) => __awaiter(void 0, void 0, void 0, function* () {
        const status = yield User_1.default.authenticate(authCode);
        return { event: "userStatus", data: status };
    }));
    Loaf.onAsync("logInUser", (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        const status = yield User_1.default.logIn(username, password);
        return { event: "userStatus", data: status };
    }));
    Loaf.onAsync("logout", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.logOut();
        return null;
    }));
    Loaf.onAsync("loadUser", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.loadUser();
        return { event: "user", data: User_1.default.getUser() };
    }));
    Loaf.onAsync("errortest", () => __awaiter(void 0, void 0, void 0, function* () {
        yield API_1.api.user.error();
        return null;
    }));
    const devMode = () => __awaiter(void 0, void 0, void 0, function* () {
        if (process.env.DEVUSER1) {
            User_1.default.register('user1', 'password', 'Hubert');
        }
        if (process.env.DEVUSER2) {
            User_1.default.register('user2', 'password', 'Hubert');
        }
        if (process.env.DEVUSER3) {
            User_1.default.register('user3', 'password', 'Hubert');
        }
    });
    devMode();
};
exports.start = start;
