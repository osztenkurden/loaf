import socketio from "socket.io-client";
import { getCookie } from "./../API/LoafAPI";
import { api } from "./../API";
import * as I from "./../interface";
import * as Machine from "./../Machine";
import User from "./../User";
import * as Loaf from "./handler";

export function initSockets() {
    const socketOpts: SocketIOClient.ConnectOpts = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Cookie: getCookie(),
                },
            },
        },
    };
    const socket = socketio("http://localhost:5000", socketOpts);

    socket.on("disconnect", () => {
        console.log("DISCONNECTION");
    });

    socket.on("connect", () => {
        console.log("CONNECTED TO SERVER");
    });

    socket.on("disconnection", () => {
        console.log("DISCONNECTION #2");
    })

    socket.on("chat", () => {
        const inbox = User.getInbox();

        if (inbox) {
            inbox.loadChats();
        }
    });

    socket.on("message", async (data: any) => {
        const inbox = User.getInbox();

        if (inbox && data.chatId) {
            inbox.loadMessages(data.chatId);
        }
    });
}

export const start = (win: Electron.WebContents) => {
    User.assign(win);

    // TODO: remove unnecessary event responses

    Loaf.on("getMachineId", () => {
        const machineId = Machine.getMachineId();

        return { event: "getMachineId", data: machineId };
    });

    Loaf.on("getUser", () => {

        return { event: "user", data: User.getUser() };
    });

    Loaf.on("getCookie", () => {
        return { event: "cookie", data: getCookie() };
    });

    Loaf.onAsync("loadImage", async (chatId) => {
        const res = await api.chats.loadImage(chatId);
        if(!res.data || !res.data.image){
            return { event: "imageLoaded", data: {id:chatId, image: null}};
        }
        return { event: "imageLoaded", data: {id:chatId, image: res.data.image}};
    })

    Loaf.onAsync("addUser", async (userId: number | string) => {
        const inbox = User.getInbox();
        if(typeof userId === "number"){
            await inbox.addFriend(userId);
        } else {
            const response = await api.user.getByName(userId);
            const data = response.data;
            if(!data){
                return { event: "userAdded", data: false };
            }
            const id = data.user?.id;
            if(!Number.isInteger(id)){
                return { event: "userAdded", data: false };
            }
            await inbox.addFriend(id);
        }

        return { event: "userAdded", data: true };
    });

    Loaf.onAsync("createChatTest", async () => {
        const response = await api.inbox.createTestChat();

        return { event: 'createdChat', data: response.data };
    })

    Loaf.onAsync("getUserByName", async (name: string) => {
        const response = await api.user.getByName(name);
        return { event: "userData", data: response.data };
    });

    Loaf.onAsync("acceptChat", async (chatId: number) => {
        const inbox = User.getInbox();
        const result = await inbox.acceptChat(chatId);
        if (result) {
            await inbox.loadChats();
        }
        return { event: "acceptInvitation", data: null };
    });

    Loaf.onAsync("getChats", async () => {
        const inbox = User.getInbox();
        await inbox.loadChats();

        return { event: "chatsLoaded", data: true };
    });

    Loaf.onAsync("sendMessage", async (chatId: number, message: I.IMessageContent) => {
        const inbox = User.getInbox();
        await inbox.sendToChat(chatId, message);
        return null;
    });

    Loaf.onAsync("register", async (username: string, password: string, name: string) => {
        const result = await User.register(username, password, name);

        return { event: "userCreated", data: result };
    });

    Loaf.onAsync("authenticateUser", async (authCode: number) => {
        const status = await User.authenticate(authCode);

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("logInUser", async (username: string, password: string) => {
        const status = await User.logIn(username, password);

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("loadUser", async () => {
        await User.loadUser();
        return { event: "user", data: User.getUser() };
    });
    const devMode = async () => {

        if(process.env.DEVUSER1){
            User.register('user1', 'password', 'Hubert');
        }
    
        if(process.env.DEVUSER2){
            User.register('user2', 'password', 'Hubert');
        }
        if(process.env.DEVUSER3){
            User.register('user3', 'password', 'Hubert');
        }
    }
    devMode();
};
