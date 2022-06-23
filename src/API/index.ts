import * as I from "../../modules/interface";
import * as Loaf from "./Loaf";
import EventEmitter from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';

export const events = new EventEmitter();

const addReaction = (chatId: number, emoji: string, reactionTo: I.IAnyMessage) => {
    if(!("uuid" in reactionTo.content)) return;
    const uuid = uuidv4();
    const message: I.IMessageContentReactionInput = {
        type: "reaction",
        content: emoji,
        reference: reactionTo.content.uuid
    }
    api.message.send(chatId, message, uuid);
}

const api = {
    session: {
        getCookie: () => Loaf.api("getCookie", true)
    },
    chats: {
        accept: (chatId: number) => Loaf.api("acceptChat", false, chatId),
        createGroup: (name: string, users: number[]) => Loaf.api("createGroup", false, name, users),
        get: () => Loaf.api("getChats", false),
        loadImage: (chatId: number, force = false) => Loaf.api("loadImage", false, chatId, force),
        loadPageOfMessages: (chatId: number, page: number) => Loaf.api("loadPageOfMessages", false, chatId, page),
        updateChatInfo: (chatId: number, name: string, image?: string) => Loaf.api('updateChat', false, chatId, name, image)
    },
    message: {
        send: (chatId: number, message: I.IMessageContentInput, localUUID: string) => Loaf.api("sendMessage", false, chatId, message, localUUID),
        addReaction: addReaction
    },
    call: {
      make: (data: I.CallDescription) => Loaf.api('call-to-user', false, data),
      reject: () => Loaf.api('reject-call', false),
      answer: (data: I.CallDescription) => Loaf.api('exchange-offer', false, data),
      accept: (data: I.CallDescription) => Loaf.api('accept-call', false, data),
      error: () => Loaf.api('errortest', false)
    },
    user: {
        add: (userId: number | string) => Loaf.api("addUser", false, userId),
        authenticate: (authCode: string) => Loaf.api("authenticateUser", false, authCode),
        get: () => Loaf.api("getUser", true),
        getUserByName: (name: string) => Loaf.api("getUserByName", false, name),
        load: () => Loaf.api("loadUser", false),
        logout: () => Loaf.api("logout", false),
        logIn: (username: string, password: string) => Loaf.api("logInUser", false, username, password),
        register: (username: string, pwd: string, name: string) => Loaf.api("register", false, username, pwd, name ),
    },
};

export default api;
