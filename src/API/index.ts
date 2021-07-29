import * as I from "../../modules/interface";
import * as Loaf from "./Loaf";

const api = {
    session: {
        getCookie: () => Loaf.api("getCookie", true)
    },
    chats: {
        accept: (chatId: number) => Loaf.api("acceptChat", false, chatId),
        createGroup: (name: string, users: number[]) => Loaf.api("createGroup", false, name, users),
        get: () => Loaf.api("getChats", false),
        loadImage: (chatId: number) => Loaf.api("loadImage", false, chatId),
        loadPageOfMessages: (chatId: number, page: number) => Loaf.api("loadPageOfMessages", false, chatId, page),
    },
    message: {
        send: (chatId: number, message: I.IMessageContent) => Loaf.api("sendMessage", false, chatId, message),
    },
    call: {
      make: (data: I.CallDescription) => Loaf.api('call-to-user', false, data),
      reject: () => Loaf.api('reject-call', false),
      answer: (data: I.CallDescription) => Loaf.api('exchange-offer', false, data),
      accept: (data: I.CallDescription) => Loaf.api('accept-call', false, data)
    },
    user: {
        add: (userId: number | string) => Loaf.api("addUser", false, userId),
        authenticate: (authCode: number) => Loaf.api("authenticateUser", false, authCode),
        get: () => Loaf.api("getUser", true),
        getUserByName: (name: string) => Loaf.api("getUserByName", false, name),
        load: () => Loaf.api("loadUser", false),
        logIn: (username: string, password: string) => Loaf.api("logInUser", false, username, password),
        register: (username: string, pwd: string, name: string) => Loaf.api("register", false, username, pwd, name ),
    },
};

export default api;
