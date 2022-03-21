import fetchHandler from "fetch-cookie";
import nodeFetch, { RequestInit } from "node-fetch";
import { CookieJar } from "tough-cookie";
import * as I from "../interface";
import {directories} from "./../Machine";
import { FileCookieStore } from 'tough-cookie-file-store';
import fs from "fs";
import path from 'path';
import User from "../User";
import { app } from "electron";

const cookiePath = path.join(app.getPath('userData'), 'cookie.json');
const cookieJar = new CookieJar(new FileCookieStore(cookiePath));
export const fetch = fetchHandler(nodeFetch, cookieJar);

export const config = {
    apiURL: process.env.local === 'true' ? 'http://localhost:5000' : "https://loaf.bakerysoft.pl",
};


export const getCookie = () => {
    const cookieString = cookieJar.getCookieStringSync(config.apiURL);
    return cookieString;
}
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
export default async function apiV2(url: string, method = "GET", body?: object): Promise<I.IServerResponse> {
    const options: RequestInit = {
        headers: { "Accept": "application/json", "Content-Type": "application/json", 'api-version': '1.0' },
        method,
    };

    if (method !== 'GET' && method !== 'HEAD') {
        options.body = JSON.stringify(body || {});
    }
    let res;
    try {
        res = await fetch(`${config.apiURL}/${url}`, options);
    } catch (e){
        const errorContent = `
            URL: ${url}
            METHOD: ${method}
            ERROR: ${e}
            BODY: ${options.body}
        `;
        console.log('Error has been saved')
        fs.writeFileSync(path.join(directories.db, `error-${new Date().getTime()}-${generateString(10)}.txt`), errorContent);
        return { status: 500, success: false};
    }
    try {
        const response = {
            data: await res.json(),
            status: res.status,
            success: res.status < 300,
        };
        if(!response.success && response.data && response.data.errorMessage && User.window){
            User.window.send('error-message', response.data.errorMessage);
        }
        return response;
    } catch {
        // Checks if status was successfull (HTTP200-HTTP299)
        return { status: res.status, success: res.status < 300 };
    }
}

export const LoafStatus = (listeners: I.IStatusListener[]) => async (url: string, method = "GET", body?: object) => {
    const response = await apiV2(url, method, body);
    const actualListeners = listeners.filter((listener) => listener.status === response.status);

    for (const listener of actualListeners) {
        listener.listener();
    }
};
