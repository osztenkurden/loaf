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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoafStatus = exports.getCookie = void 0;
const fetch_cookie_1 = __importDefault(require("fetch-cookie"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const tough_cookie_1 = require("tough-cookie");
const Machine_1 = require("./../Machine");
const tough_cookie_file_store_1 = require("tough-cookie-file-store");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../User"));
const electron_1 = require("electron");
const cookiePath = path_1.default.join(electron_1.app.getPath('userData'), 'cookie.json');
const cookieJar = new tough_cookie_1.CookieJar(new tough_cookie_file_store_1.FileCookieStore(cookiePath));
const fetch = fetch_cookie_1.default(node_fetch_1.default, cookieJar);
const config = {
    apiURL: "https://loaf.bakerysoft.pl",
};
const getCookie = () => {
    const cookieString = cookieJar.getCookieStringSync(config.apiURL);
    return cookieString;
};
exports.getCookie = getCookie;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function apiV2(url, method = "GET", body) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            method,
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        let res;
        try {
            res = yield fetch(`${config.apiURL}/${url}`, options);
        }
        catch (e) {
            const errorContent = `
            URL: ${url}
            METHOD: ${method}
            ERROR: ${e}
            BODY: ${options.body}
        `;
            console.log('Error has been saved');
            fs_1.default.writeFileSync(path_1.default.join(Machine_1.directories.db, `error-${new Date().getTime()}-${generateString(10)}.txt`), errorContent);
            return { status: 500, success: false };
        }
        try {
            const response = {
                data: yield res.json(),
                status: res.status,
                success: res.status < 300,
            };
            if (!response.success && response.data && response.data.errorMessage && User_1.default.window) {
                User_1.default.window.send('error-message', response.data.errorMessage);
            }
            return response;
        }
        catch (_a) {
            // Checks if status was successfull (HTTP200-HTTP299)
            return { status: res.status, success: res.status < 300 };
        }
    });
}
exports.default = apiV2;
const LoafStatus = (listeners) => (url, method = "GET", body) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield apiV2(url, method, body);
    const actualListeners = listeners.filter((listener) => listener.status === response.status);
    for (const listener of actualListeners) {
        listener.listener();
    }
});
exports.LoafStatus = LoafStatus;
