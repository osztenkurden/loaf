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
var fetch_cookie_1 = __importDefault(require("fetch-cookie"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var tough_cookie_1 = __importDefault(require("tough-cookie"));
var cookieJar = new tough_cookie_1["default"].CookieJar();
var fetch = fetch_cookie_1["default"](node_fetch_1["default"], cookieJar);
var config = {
    apiURL: "http://localhost:5000"
};
exports.getCookie = function () {
    var cookieString = cookieJar.getCookieStringSync(config.apiURL);
    return cookieString;
};
function apiV2(url, method, body) {
    if (method === void 0) { method = "GET"; }
    return __awaiter(this, void 0, void 0, function () {
        var options, res, response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    options = {
                        headers: { "Accept": "application/json", "Content-Type": "application/json" },
                        method: method
                    };
                    if (body) {
                        options.body = JSON.stringify(body);
                    }
                    return [4 /*yield*/, fetch(config.apiURL + "/" + url, options)];
                case 1:
                    res = _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    _a = {};
                    return [4 /*yield*/, res.json()];
                case 3:
                    response = (_a.data = _c.sent(),
                        _a.status = res.status,
                        _a.success = res.status < 300,
                        _a);
                    return [2 /*return*/, response];
                case 4:
                    _b = _c.sent();
                    // Checks if status was successfull (HTTP200-HTTP299)
                    return [2 /*return*/, { status: res.status, success: res.status < 300 }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = apiV2;
exports.LoafStatus = function (listeners) { return function (url, method, body) {
    if (method === void 0) { method = "GET"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, actualListeners, _i, actualListeners_1, listener;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apiV2(url, method, body)];
                case 1:
                    response = _a.sent();
                    actualListeners = listeners.filter(function (listener) { return listener.status === response.status; });
                    for (_i = 0, actualListeners_1 = actualListeners; _i < actualListeners_1.length; _i++) {
                        listener = actualListeners_1[_i];
                        listener.listener();
                    }
                    return [2 /*return*/];
            }
        });
    });
}; };
