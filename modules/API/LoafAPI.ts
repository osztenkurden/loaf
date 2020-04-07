import fetchHandler from "fetch-cookie";
import nodeFetch from "node-fetch";
import toughCookie from "tough-cookie";
import * as I from "../interface";

const cookieJar = new toughCookie.CookieJar();
const fetch = fetchHandler(nodeFetch, cookieJar);

const config = {
    apiURL: "http://localhost:5000",
};

export const getCookie = () => {
    const cookieString = cookieJar.getCookieStringSync(config.apiURL);
    return cookieString;
}

export default async function apiV2(url: string, method = "GET", body?: object): Promise<I.IServerResponse> {
    const options: RequestInit = {
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        method,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`${config.apiURL}/${url}`, options);
    try {
        const response = {
            data: await res.json(),
            status: res.status,
            success: res.status < 300,
        };
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
