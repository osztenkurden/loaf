"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var Keys = __importStar(require("./Keys"));
// import util from "util";
// declare let window: any;
// tslint:disable-next-line:no-var-requires
var libsignal = require("./../Breadcrumb/libsignal/index");
function toHex(str) {
    var hex = "";
    for (var i = 0; i < str.length; i++) {
        hex += "" + str.charCodeAt(i).toString(16);
    }
    return hex;
}
function hexToAscii(hex) {
    hex = hex.toString(); // force conversion
    var str = "";
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== "00"); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
var LoafBreadbox = /** @class */ (function () {
    function LoafBreadbox(storeHex) {
        var _this = this;
        this.put = function (key, value) {
            if (key === undefined || value === undefined || key === null || value === null) {
                throw new Error("Tried to store undefined/null");
            }
            _this.store[key] = value;
        };
        this.get = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            if (key === null || key === undefined) {
                throw new Error("Tried to get value for undefined/null key");
            }
            if (key in _this.store) {
                return _this.store[key];
            }
            return defaultValue;
        };
        this.getIdentityKeyPair = function () {
            return _this.get("identityKey");
        };
        this.getLocalRegistrationId = function () {
            return _this.get("registrationId");
        };
        this.remove = function (key) {
            if (key === null || key === undefined)
                throw new Error("Tried to remove value for undefined/null key");
            delete _this.store[key];
        };
        this.isTrustedIdentity = function (identifier, identityKey, direction) {
            if (identifier === null || identifier === undefined) {
                throw new Error("tried to check identity key for undefined/null key");
            }
            if (!(identityKey instanceof ArrayBuffer)) {
                throw new Error("Expected identityKey to be an ArrayBuffer");
            }
            var trusted = _this.get("identityKey" + identifier);
            if (trusted === undefined) {
                return true;
            }
            return identityKey.toString() === trusted.toString();
        };
        this.loadIdentityKey = function (identifier) {
            if (identifier === null || identifier === undefined)
                throw new Error("Tried to get identity key for undefined/null key");
            return _this.get("identityKey" + identifier);
        };
        this.saveIdentity = function (identifier, identityKey) {
            if (identifier === null || identifier === undefined)
                throw new Error("Tried to put identity key for undefined/null key");
            var address = new libsignal.SignalProtocolAddress.fromString(identifier);
            var existing = _this.get("identityKey" + address.getName());
            _this.put("identityKey" + address.getName(), identityKey);
            if (existing && identityKey.toString() !== existing.toString()) {
                return true;
            }
            return false;
        };
        this.loadPreKey = function (keyId) {
            var res = _this.get("25519KeypreKey" + keyId);
            if (res !== undefined) {
                return { pubKey: res.pubKey, privKey: res.privKey };
            }
            return res;
        };
        this.storePreKey = function (keyId, keyPair) {
            return _this.put("25519KeypreKey" + keyId, keyPair);
        };
        this.removePreKey = function (keyId) {
            return _this.remove("25519KeypreKey" + keyId);
        };
        this.loadSignedPreKey = function (keyId) {
            var res = _this.get("25519KeysignedKey" + keyId);
            if (res !== undefined) {
                return { pubKey: res.pubKey, privKey: res.privKey, signature: res.signature };
            }
            return res;
        };
        this.storeSignedPreKey = function (keyId, keyPair) {
            return _this.put("25519KeysignedKey" + keyId, keyPair);
        };
        this.removeSignedPreKey = function (keyId) {
            return _this.remove("25519KeysignedKey" + keyId);
        };
        this.createSession = function (address, preKeyBundle) { return __awaiter(_this, void 0, void 0, function () {
            var sessionBuilder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sessionBuilder = new libsignal.sessionBuilder(this, address);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sessionBuilder.processPreKey(preKeyBundle)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.loadSession = function (identifier) {
            return _this.get("session" + identifier);
        };
        this.storeSession = function (identifier, record) {
            return _this.put("session" + identifier, record);
        };
        this.removeSession = function (identifier) {
            return _this.remove("session" + identifier);
        };
        this.removeAllSessions = function (identifier) {
            for (var id in _this.store) {
                if (id.startsWith("session" + identifier)) {
                    delete _this.store[id];
                }
            }
        };
        this.isValidKeyPair = function (keyPair) {
            return (keyPair.pubKey && keyPair.privKey
                && typeof keyPair.pubKey === "string"
                && typeof keyPair.privKey === "string");
        };
        this.setStore = function (data) {
            try {
                var json = hexToAscii(data);
                var store = JSON.parse(json);
                for (var _i = 0, _a = Object.keys(store); _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (typeof i !== "string") {
                        throw new Error("");
                    }
                    if (_this.isValidKeyPair(store[i])) {
                        //
                        var keyPair = Keys.bufferify(store[i]);
                        var inStoreKeyPair = {
                            keyId: store[i].keyId,
                            privKey: keyPair.privKey,
                            pubKey: keyPair.pubKey,
                            signature: store[i].signature ? Keys.toArrayBuffer(store[i].signature) : undefined
                        };
                        _this.put(i, inStoreKeyPair);
                    }
                    else if (typeof store[i] === "string" && (i.startsWith("identityKey") || i.startsWith("session"))) {
                        _this.put(i, store[i]);
                    }
                    else if (i === "registrationId" && Number.isInteger(store[i])) {
                        _this.put(i, store[i]);
                    }
                    else if (i.startsWith("25519KeypreKey") || i.startsWith("25519KeysignedKey")) {
                        var keyPair = Keys.bufferify(store[i]);
                        var inStoreKeyPair = {
                            keyId: store[i].keyId,
                            privKey: keyPair.privKey,
                            pubKey: keyPair.pubKey,
                            signature: store[i].signature ? Keys.toArrayBuffer(store[i].signature) : undefined
                        };
                        _this.put(i, inStoreKeyPair);
                    }
                }
                return;
            }
            catch (_b) {
                return null;
            }
        };
        this.getStore = function () {
            if (!_this.store.registrationId || !_this.store.identityKey) {
                throw new Error("");
            }
            var json = {
                identityKey: Keys.stringify(_this.store.identityKey),
                registrationId: _this.store.registrationId
            };
            for (var _i = 0, _a = Object.keys(_this.store); _i < _a.length; _i++) {
                var i = _a[_i];
                if (typeof i !== "string") {
                    throw new Error("");
                }
                if (i.startsWith("25519KeypreKey") || i.startsWith("25519KeysignedKey")) {
                    var keyPair = Keys.stringify(_this.store[i]);
                    json[i] = {
                        keyId: _this.store[i].keyId,
                        privKey: keyPair.privKey,
                        pubKey: keyPair.pubKey
                    };
                    if (_this.store[i].signature) {
                        json[i].signature = Keys.toString(_this.store[i].signature);
                    }
                }
                if ((i.startsWith("identityKey") && i !== "identityKey") || i.startsWith("session")) {
                    json[i] = _this.store[i];
                }
            }
            var stringified = JSON.stringify(json);
            var hexStore = toHex(stringified);
            return hexStore;
        };
        this.Direction = {
            RECEIVING: 2,
            SENDING: 1
        };
        this.store = {};
        if (storeHex) {
            this.setStore(storeHex);
        }
        else {
            this.init();
        }
    }
    LoafBreadbox.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keyHelper, registrationId, identityKeyPair, preKeys, signedPreKeys, preKey, signedPreKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyHelper = libsignal.KeyHelper;
                        return [4 /*yield*/, keyHelper.generateRegistrationId()];
                    case 1:
                        registrationId = _a.sent();
                        return [4 /*yield*/, keyHelper.generateIdentityKeyPair()];
                    case 2:
                        identityKeyPair = _a.sent();
                        return [4 /*yield*/, keyHelper.generatePreKey( /** dodac id */)];
                    case 3:
                        preKeys = _a.sent();
                        return [4 /*yield*/, keyHelper.generateSignedPreKey(identityKeyPair /** dodac id */)];
                    case 4:
                        signedPreKeys = _a.sent();
                        preKey = __assign({ keyId: preKeys.keyId }, preKeys.keyPair);
                        signedPreKey = __assign({ keyId: signedPreKeys.keyId, signature: signedPreKeys.signature }, signedPreKeys.keyPair);
                        this.put("identityKey", identityKeyPair);
                        this.put("registrationId", registrationId);
                        this.storePreKey(preKey.keyId, preKey);
                        this.storeSignedPreKey(signedPreKey.keyId, signedPreKeys);
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoafBreadbox;
}());
exports["default"] = LoafBreadbox;
