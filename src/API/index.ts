import * as Loaf from "./Loaf";

const api = {
    chats: {
        create: (name: string, users: number[]) => Loaf.api("createGroup", false, name, users),
        get: () => Loaf.api("getChats", false),
    },
    message: {
        send: (chatId: number, message: object) => Loaf.api("sendMessage", false, chatId, message),
    },
    user: {
        add: (userId: number) => Loaf.api("addUser", false, userId),
        authenticate: (authCode: number) => Loaf.api("authenticateUser", false, authCode),
        get: () => Loaf.api("getUser", true),
        load: () => Loaf.api("loadUser", false),
        logIn: (username: string, password: string) => Loaf.api("logInUser", false, username, password),
        register: (username: string, pwd: string, name: string) => Loaf.api("register", false, username, pwd, name ),
    },
};

export default api;
