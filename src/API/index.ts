import * as Loaf from "./Loaf";

const api = {
    user: {
        get: () => Loaf.api("getUser", true),
        load: () => Loaf.api("loadUser", false),
    },
};

export default api;
