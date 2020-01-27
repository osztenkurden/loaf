import fetchHandler from "fetch-cookie";
import nodeFetch from "node-fetch";
const fetch = fetchHandler(nodeFetch);

const config = {
    apiURL: "http://localhost:5000",
};

export default async function apiV2(url: string, method = "GET", body?: object) {
    const options: RequestInit = {
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        method,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`${config.apiURL}/api/${url}`, options);
    try {
        return await res.json();
    } catch {
        // Checks if status was successfull (HTTP200-HTTP299)
        if (res && res.status < 300) {
            return true;
        }
        return false;
    }
}
