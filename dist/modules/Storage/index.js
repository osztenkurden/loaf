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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var API_1 = require("../API");
var Keys = __importStar(require("./../Breadbox/Keys"));
var LoafBreadbox_1 = __importDefault(require("./../Breadbox/LoafBreadbox"));
var Cypher_1 = __importDefault(require("./../Cypher"));
var Machine = __importStar(require("./../Machine"));
var Storage = /** @class */ (function () {
    function Storage() {
        /*let storeContent = "";
        if (id) {
            this.userId = id;
            storeContent = this.loadStore();
        }
        const store = new Breadbox();
        store.init(storeContent);

        this.store = store;
        this.saveStoreToFile();

        this.cypher = new Cypher(this.store);*/
    }
    Storage.prototype.init = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var storeContent, store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeContent = "";
                        if (userId) {
                            this.userId = userId;
                            storeContent = this.loadStore();
                        }
                        store = new LoafBreadbox_1["default"]();
                        return [4 /*yield*/, store.init(storeContent)];
                    case 1:
                        _a.sent();
                        this.store = store;
                        this.saveStoreToFile();
                        this.cypher = new Cypher_1["default"](this.store);
                        return [2 /*return*/];
                }
            });
        });
    };
    Storage.prototype.encodeMessage = function (message, recipientId, machineId, bundle) {
        return __awaiter(this, void 0, void 0, function () {
            var encrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cypher) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.cypher.encrypt(message, recipientId, machineId, bundle)];
                    case 1:
                        encrypted = _a.sent();
                        this.saveStoreToFile();
                        return [2 /*return*/, encrypted];
                }
            });
        });
    };
    Storage.prototype.decodeMessage = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cypher) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.cypher.decrypt(msg.content, msg.senderId, msg.senderMachine, msg.type === 3)];
                    case 1:
                        content = _a.sent();
                        this.saveStoreToFile();
                        return [2 /*return*/, content];
                }
            });
        });
    };
    Storage.prototype.setUserId = function (id) {
        if (this.userId) {
            return this;
        }
        this.userId = id;
        return this;
    };
    /**
     * Registration data retrivial methods
     */
    Storage.prototype.getRegistrationId = function () {
        return this.store.getLocalRegistrationId();
    };
    Storage.prototype.getIdentityKeyPair = function () {
        return this.store.getIdentityKeyPair();
    };
    Storage.prototype.getPreKeys = function () {
        return this.store.getPreKeys();
    };
    Storage.prototype.getSignedPreKey = function () {
        return this.store.getSignedPreKey();
    };
    /**
     * Saves up-to-date user encryption session to drive
     */
    Storage.prototype.saveStoreToFile = function () {
        var storePath = this.getStorePath();
        if (!fs.existsSync(storePath) && !this.userId) {
            return this;
        }
        else if (!fs.existsSync(storePath) && this.userId) {
            this.createStoreFile();
        }
        fs.writeFileSync(storePath, this.store.getStore(), "utf8");
        return this;
    };
    Storage.prototype.getStore = function () {
        return this.store;
    };
    Storage.prototype.getUserBundle = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, signedKeyPair, preKeyPair, bundle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.user.getBundle(userId)];
                    case 1:
                        response = _a.sent();
                        if (!response || !response.data) {
                            return [2 /*return*/, null];
                        }
                        data = response.data;
                        signedKeyPair = {
                            keyId: data.signedPreKey.keyId,
                            publicKey: Keys.toArrayBuffer(data.signedPreKey.pubKey),
                            signature: Keys.toArrayBuffer(data.signedPreKey.signature)
                        };
                        preKeyPair = {
                            keyId: data.preKey.keyId,
                            publicKey: Keys.toArrayBuffer(data.preKey.pubKey)
                        };
                        bundle = {
                            identityKey: Keys.toArrayBuffer(data.identityKey),
                            preKey: preKeyPair,
                            registrationId: data.registrationId,
                            signedPreKey: signedKeyPair
                        };
                        return [2 /*return*/, bundle];
                }
            });
        });
    };
    Storage.prototype.createSession = function (machine) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, store, cypher, userId, machineId, session, bundle, msg, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, store = _a.store, cypher = _a.cypher;
                        userId = machine.userId, machineId = machine.machineId;
                        return [4 /*yield*/, store.loadSession(userId + "." + machineId)];
                    case 1:
                        session = _b.sent();
                        if (session) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.getUserBundle(userId)];
                    case 2:
                        bundle = _b.sent();
                        if (!bundle) {
                            return [2 /*return*/, false];
                        }
                        msg = { type: "text", content: "Hello there!" };
                        return [4 /*yield*/, this.encodeMessage(msg, userId, machineId, bundle)];
                    case 3:
                        message = _b.sent();
                        return [2 /*return*/, {
                                content: message.body,
                                machineId: machineId,
                                recipientId: userId,
                                type: message.type
                            }];
                }
            });
        });
    };
    Storage.prototype.getStorePath = function () {
        var storePath = path.join(Machine.directories.db, "user-" + this.userId + ".loaf");
        return storePath;
    };
    Storage.prototype.loadStore = function () {
        this.createStoreFile();
        var storeContent = fs.readFileSync(this.getStorePath(), "utf8");
        return storeContent;
    };
    Storage.prototype.createStoreFile = function () {
        var storePath = this.getStorePath();
        if (fs.existsSync(storePath)) {
            return this;
        }
        fs.writeFileSync(storePath, "");
        return this;
    };
    return Storage;
}());
exports["default"] = Storage;
