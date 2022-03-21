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
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
const electron_1 = require("electron");
const thirty_two_1 = __importDefault(require("thirty-two"));
const Inbox_1 = __importDefault(require("../Inbox"));
const Storage_1 = __importDefault(require("../Storage"));
const API_1 = require("./../API");
const LoafBreadbox_1 = require("./../Breadbox/LoafBreadbox");
const DiffieHellman_1 = require("./../Crypto/DiffieHellman");
const EventHandler_1 = require("./../EventHandler");
const Machine = __importStar(require("./../Machine"));
class User {
    constructor() {
        this.id = null;
        this.user = null;
        this.storage = null;
        this.window = null;
        this.inbox = null;
    }
    assign(window) {
        this.window = window;
    }
    loadUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield API_1.api.user.get();
            console.log(user);
            if (!user) {
                return this;
            }
            this.user = user;
            yield this.initStorage(user.id);
            this.initInbox();
            EventHandler_1.initSockets();
            /*
            const storage = new Storage();
    
            await storage.init(user.id);
    
            this.storage = storage;
            */
            return this;
        });
    }
    logOut() {
        return __awaiter(this, void 0, void 0, function* () {
            yield API_1.api.user.logout();
            electron_1.app.quit();
        });
    }
    logIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield API_1.api.user.login({ username, password, machineId: Machine.getMachineId() });
            if (result.status === 200) {
                yield this.loadUser();
            }
            return result.status;
        });
    }
    register(username, password, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = yield DiffieHellman_1.generateKeys();
                if (!keys) {
                    return false;
                }
                const storage = (yield this.initStorage()).getStorage();
                if (!storage) {
                    return false;
                }
                const signedPreKey = storage.getSignedPreKey();
                const preKeys = storage.getPreKeys();
                const identityKeyPair = yield storage.getIdentityKeyPair();
                if (!signedPreKey || !preKeys || !identityKeyPair) {
                    return false;
                }
                const payload = {
                    firstName,
                    identityKey: LoafBreadbox_1.parseKeyObject(identityKeyPair).pubKey,
                    keys: this.getKeys(keys),
                    machineId: Machine.getMachineId(),
                    password,
                    preKeys,
                    registrationId: yield storage.getRegistrationId(),
                    signedPreKey,
                    username,
                };
                const result = yield API_1.api.user.register(payload);
                if (!result) {
                    return false;
                }
                const user = result;
                storage.setUserId(user.id).saveStoreToFile();
                if ("token" in keys) {
                    return thirty_two_1.default.encode(keys.token).toString().replace(/=/g, "");
                    ;
                }
                const diffieHellman = crypto_1.default.createDiffieHellman(keys.prime, "hex", keys.generator, "hex");
                diffieHellman.setPrivateKey(keys.private, "hex");
                diffieHellman.setPublicKey(keys.public, "hex");
                const secret = diffieHellman.computeSecret(user.publicKey);
                const token = thirty_two_1.default.encode(secret).toString().replace(/=/g, "");
                return token;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
    }
    authenticate(authCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield API_1.api.user.authenticate(authCode, Machine.getMachineName());
            if (result.status === 200) {
                yield this.loadUser();
            }
            return result.status;
        });
    }
    initStorage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storage) {
                this.storage = new Storage_1.default();
                yield this.storage.init(userId);
            }
            return this;
        });
    }
    getInbox() {
        return this.inbox;
    }
    getStorage() {
        return this.storage;
    }
    getUser() {
        return this.user;
    }
    initInbox() {
        var _a;
        if (!this.inbox && ((_a = this.user) === null || _a === void 0 ? void 0 : _a.id) && this.window && this.storage) {
            this.inbox = new Inbox_1.default(this.window, this.user.id, this.storage);
        }
        return this;
    }
    getKeys(keys) {
        if ("token" in keys) {
            const key = {
                token: keys.token
            };
            return key;
        }
        const key = {
            generator: keys.generator,
            prime: keys.prime,
            public: keys.public
        };
        return key;
    }
}
exports.User = User;
const localUser = new User();
exports.default = localUser;
