import * as Loaf from "./Loaf";

const api = {
    keys: {
        getIdentityKey: () => Loaf.api("getIdentityKey", true),
        getRegistrationId: () => Loaf.api("getRegistrationId", true),
    },
    user: {
        authenticate: (authCode: number) => Loaf.api("authenticateUser", false, authCode),
        get: () => Loaf.api("getUser", true),
        load: () => Loaf.api("loadUser", false),
        logIn: (username: string, password: string) => Loaf.api("logInUser", false, username, password),
    },
};

export default api;
