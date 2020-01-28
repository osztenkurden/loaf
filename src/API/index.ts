import * as Loaf from "./Loaf";

const api = {
    user: {
        get: () => Loaf.api("getUser", true),
        load: () => Loaf.api("loadUser", false),
        logIn: (username: string, password: string) => Loaf.api("logInUser", false, username, password),
    },
};

export default api;
