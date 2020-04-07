import * as I from "../../modules/interface";
import * as Loaf from "./Loaf";

const api = {
    chats: {
        accept: (chatId: number) => Loaf.api("acceptChat", false, chatId),
        create: (name: string, users: number[]) => Loaf.api("createGroup", false, name, users),
        get: () => Loaf.api("getChats", false),
    },
    message: {
        send: (chatId: number, message: I.IMessageContent) => Loaf.api("sendMessage", false, chatId, message),
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
