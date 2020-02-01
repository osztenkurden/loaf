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
var crypto_1 = __importDefault(require("crypto"));
var thirty_two_1 = __importDefault(require("thirty-two"));
var Storage_1 = __importDefault(require("../Storage"));
var API_1 = require("./../API");
var DiffieHellman_1 = require("./../Crypto/DiffieHellman");
var Machine = __importStar(require("./../Machine"));
var User = /** @class */ (function () {
    function User() {
        this.id = null;
        this.user = null;
        this.storage = null;
    }
    User.prototype.loadUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.user.get()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, this];
                        }
                        this.user = user;
                        return [4 /*yield*/, this.initStorage(user.id)];
                    case 2:
                        _a.sent();
                        /*
                        const storage = new Storage();
                
                        await storage.init(user.id);
                
                        this.storage = storage;
                        */
                        return [2 /*return*/, this];
                }
            });
        });
    };
    User.prototype.logIn = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.user.login({ username: username, password: password, machineId: Machine.getMachineId() })];
                    case 1:
                        result = _a.sent();
                        if (!(result.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadUser()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, result.status];
                }
            });
        });
    };
    User.prototype.register = function (username, password, firstName) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, storage, payload, result, user, diffieHellman, secret, token, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, DiffieHellman_1.generateKeys()];
                    case 1:
                        keys = _a.sent();
                        return [4 /*yield*/, this.initStorage()];
                    case 2:
                        storage = (_a.sent()).getStorage();
                        payload = {
                            firstName: firstName,
                            identityKey: storage.getIdentityKeyPair().pubKey,
                            keys: {
                                generator: keys.gen,
                                prime: keys.prime,
                                public: keys.public
                            },
                            machineId: Machine.getMachineId(),
                            password: password,
                            preKeys: storage.getPreKeys(),
                            registrationId: storage.getRegistrationId(),
                            signedPreKey: storage.getSignedPreKey(),
                            username: username
                        };
                        return [4 /*yield*/, API_1.api.user.register(payload)];
                    case 3:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, false];
                        }
                        user = result;
                        storage.setUserId(user.id).saveStoreToFile();
                        diffieHellman = crypto_1["default"].createDiffieHellman(keys.prime, "hex", keys.gen, "hex");
                        diffieHellman.setPrivateKey(keys.private, "hex");
                        diffieHellman.setPublicKey(keys.public, "hex");
                        secret = diffieHellman.computeSecret(user.publicKey);
                        token = thirty_two_1["default"].encode(secret).toString().replace(/=/g, "");
                        return [2 /*return*/, token];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.authenticate = function (authCode) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, API_1.api.user.authenticate(authCode, Machine.getMachineName())];
                    case 1:
                        result = _a.sent();
                        if (!(result.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.loadUser()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, result.status];
                }
            });
        });
    };
    User.prototype.initStorage = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.storage) return [3 /*break*/, 2];
                        this.storage = new Storage_1["default"]();
                        return [4 /*yield*/, this.storage.init(userId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        });
    };
    User.prototype.getStorage = function () {
        return this.storage;
    };
    User.prototype.getUser = function () {
        return this.user;
    };
    return User;
}());
exports.User = User;
var localUser = new User();
exports["default"] = localUser;
