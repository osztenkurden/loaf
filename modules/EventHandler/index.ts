import socketio, { ManagerOptions, SocketOptions } from "socket.io-client";
import { getCookie, config, fetch } from "./../API/LoafAPI";
import { api } from "./../API";
import * as I from "./../interface";
import * as Machine from "./../Machine";
import User from "./../User";
import * as Loaf from "./handler";
import { BrowserWindow, ipcMain, shell } from "electron";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
interface CallStatus {
    caller: string | null;
    status: 'incoming' | 'ongoing' | null;
}

const call: CallStatus = {
    caller: null,
    status: null,
}

export function initSockets() {
    const socketOpts: Partial<ManagerOptions & SocketOptions> = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Cookie: getCookie(),
                    'api-version': config.apiVersion
                },
            },

        },
        //rejectUnauthorized: false,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 1500,
        withCredentials: true,
        reconnection: true,
        //transports: ['websocket'],
    };
    console.log("CONNECTION IS TRYING TO BE MADE")
    const socket = socketio(config.apiURL, socketOpts);
    socket.on("connect_error", (err: any) => {
        console.log(`connect_error due to ${err}`);
    });

    socket.on("connect", () => {
        console.log("CONNECTED TO SERVER");
    });
    socket.on('error', (err: any) => {
        console.log(err)
    })

    const rejectCall = () => {
        socket.emit('reject-call');
        call.caller = null;
        call.status = null;
    }

    socket.on("disconnect", () => {
        console.log("DISCONNECTION");
    });

    socket.on("chat", () => {
        const inbox = User.getInbox();

        if (inbox) {
            inbox.loadChats();
        }
    });

    setInterval(() => {
        socket.emit('ping');
    }, 30_000);

    /**
     * Events from server: call-rejected, call-offer, call-failed
     */

    socket.on('call-offer', (data: I.CallDescription) => {
        if (!User.window || (call.caller && call.caller !== data.target)) return;
        User.window.send('call-offer', data);

        call.caller = data.target;
        call.status = data.type === 'accept' ? 'ongoing' : 'incoming';
    });

    socket.on('call-rejected', () => {
        if (!User.window || !call.caller) return;
        User.window.send('call-rejected');

        call.caller = null;
        call.status = null;
    });

    socket.on('call-failed', () => {
        if (!User.window) return;
        User.window.send('call-failed');

        call.caller = null;
        call.status = null;
    });

    Loaf.onAsync("call-to-user", async (data: I.CallDescription) => {
        socket.emit('call-to-user', data);
        console.log('sending to user', data.target);
        //below uninportant
        return { event: "called-to-user", data: null };
    });

    Loaf.onAsync("exchange-offer", async (data: I.CallDescription) => {
        socket.emit('exchange-offer', data);

        //below uninportant
        return { event: "exchanged-offer", data: null };
    });

    Loaf.onAsync("accept-call", async (data: I.CallDescription) => {
        socket.emit('accept-call', data);

        //below uninportant
        return { event: "accepted-call", data: null };
    });

    Loaf.onAsync("reject-call", async () => {
        rejectCall();

        //below uninportant
        return { event: "call-rejection", data: null };
    });

    socket.on("message", async (data: any) => {
        const inbox = User.getInbox();

        if (inbox && data.chatId) {
            inbox.loadMessages(data.chatId);
        }
    });
}

export const start = (window: BrowserWindow, /*win: Electron.WebContents*/) => {
    const win = window.webContents;
    
    User.assign(win);

    Loaf.onAsync("openFileDirectory", async (file: string) => {
        shell.showItemInFolder(file);

        return null;
    });

    Loaf.onAsync("min", async () => {
        window.minimize();

        return null;
    });

    Loaf.onAsync("max", async () => {
		if (window.isMaximized()) {
			window.restore();
		} else {
			window.maximize();
		}
        return null;
    });

    Loaf.onAsync("close", async () => {
        window.close();

        return null;
    });

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

    Loaf.onAsync("loadImage", async (chatId, force = false) => {
        const pathToImage = path.join(Machine.directories.images, `${chatId}.png`);
        if(fs.existsSync(pathToImage) && !force){
            return { event: "imageLoaded", data: { id: chatId, image: pathToImage } };
        }
        const result = await fetch(`${config.apiURL}/chats/image?chatId=${chatId}`, { headers: { "Accept": "application/json", "Content-Type": "application/json", 'api-version': config.apiVersion }})
            .then(res => new Promise<boolean>((resolve) => {
                const stream = fs.createWriteStream(pathToImage);

                res.body.pipe(stream);
                stream.on('close', () => resolve(true));
                stream.on('error', () => resolve(false));
            }));

        if (!result) {
            return { event: "imageLoaded", data: { id: chatId, image: null } };
        }
        return { event: "imageLoaded", data: { id: chatId, image: pathToImage } };
    });

    Loaf.onAsync("addUser", async (userId: number | string) => {
        const inbox = User.getInbox();
        if (!inbox) return { event: "userAdded", data: false };
        if (typeof userId === "number") {
            await inbox.addFriend(userId);
        } else {
            const response = await api.user.getByName(userId);
            const data = response.data;
            if (!data) {
                return { event: "userAdded", data: false };
            }
            const id = data.user?.id;
            if (!Number.isInteger(id)) {
                return { event: "userAdded", data: false };
            }
            await inbox.addFriend(id);
        }

        return { event: "userAdded", data: true };
    });

    Loaf.onAsync("createGroup", async (name: string, users: number[]) => {
        const user = User.getUser();
        if (!user?.id) return null;
        if (!users.includes(user.id)) {
            users.push(user.id);
        }
        const response = await api.inbox.createGroup(name, users);
        return { event: 'createdChat', data: response.data };
    })

    Loaf.onAsync('updateChat', async (chatId:number, name: string, image?: string) => {
        const response = await api.chats.updateChatInfo(chatId, name, image);

        return  { event: 'updatedChat', data: { chatId, data: response.data} };
    });

    Loaf.onAsync("getUserByName", async (name: string) => {
        const response = await api.user.getByName(name);
        return { event: "userData", data: response.data };
    });

    Loaf.onAsync("acceptChat", async (chatId: number) => {
        const inbox = User.getInbox();
        if (!inbox) {
            return { event: "acceptInvitation", data: false };
        }
        const result = await inbox.acceptChat(chatId);
        if (result) {
            await inbox.loadChats();
        }
        return { event: "acceptInvitation", data: null };
    });

    Loaf.onAsync("getChats", async () => {
        const inbox = User.getInbox();
        if (!inbox) {
            return { event: "chatsLoaded", data: false };
        }
        await inbox.loadChats();

        return { event: "chatsLoaded", data: true };
    });

    Loaf.onAsync("loadPageOfMessages", async (chatId: number, page: number) => {
        const inbox = User.getInbox();
        if (!inbox) {
            return { event: "loadedPage", data: false };
        }
        await inbox.loadMessagesFromPage(chatId, page);

        return { event: "loadedPage", data: true };
    });

    Loaf.onAsync("sendMessage", async (chatId: number, message: I.IMessageContentInput, localUUID: string) => {
        const inbox = User.getInbox();

        const messageWithUUID: I.IMessageContentInputWithUUID = { ...message, uuid: uuidv4()}

        await inbox?.sendToChat(chatId, messageWithUUID, localUUID);
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
        console.log(username)
        const status = await User.logIn(username, password);

        console.log(status)

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("logout", async () => {
        await User.logOut();

        return null;
    });

    Loaf.onAsync("loadUser", async () => {
        await User.loadUser();
        return { event: "user", data: User.getUser() };
    });
    Loaf.onAsync("errortest", async () => {
        await api.user.error();

        return null;
    });
    const devMode = async () => {

        if (process.env.DEVUSER1) {
            User.register('user1', 'password', 'Hubert');
        }

        if (process.env.DEVUSER2) {
            User.register('user2', 'password', 'Hubert');
        }
        if (process.env.DEVUSER3) {
            User.register('user3', 'password', 'Hubert');
        }
    }
    devMode();
};
