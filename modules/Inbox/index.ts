import crypto from "crypto";
import base32 from "thirty-two";
import { api } from "../API";
import * as I from "../interface";
import * as Machine from "../Machine";
import Storage from "../Storage";
import * as Loaf from "./../EventHandler/handler";
// import * as Machine from "../Machine";

export default class Inbox {
    private chats: I.IChat[];
    private content: Electron.WebContents;
    private userId: number;
    private storage: Storage | null;

    constructor(content: Electron.WebContents, userId: number, storage: Storage) {
        this.chats = [];
        this.content = content;
        this.userId = userId;
        this.storage = storage;
        this.loadChats();
    }

    public addFriend = async (userId: number) => {
        const response = await api.inbox.addFriend(userId);

        return this;
    }

    public getChats = async () => {
        if (!this.chats.length) {
            await this.loadChats();
        }
        return this.chats;
    }

    public loadChats = async () => {
        const response = await api.inbox.getChats();
        if (response.success && response.data) {
            this.chats = response.data.chats.map((chats) => ({...chats, messages: []}));
        }
        this.content.send("chats", this.chats);
        // Loaf.send("chats", this.chats);
        return this;
    }

    private async getReceivers(chatId: number) {
        const response = await api.inbox.getReceivers(chatId);
        if (!response.status || !response.data) {
            return [];
        }
        const store = this.storage.getStore();
        const machineId = Machine.getMachineId();
        const machines = response.data.machines as I.IMachine[];
        const receivers = machines.filter((mch) => mch.userId !== this.userId || mch.machineId !== machineId);

        return receivers;
    }

    private async acceptChat(chatId: number) {
        const receivers = await this.getReceivers(chatId);
        if (!receivers.length) {
            return false;
        }
        const messages = [];
        const machineId = Machine.getMachineId();

        for (const machine of receivers) {
            const message = await this.storage.createSession(machine);
            if (typeof message !== "boolean") {
                messages.push(message);
            }
        }
        const payload = {
            chatId,
            entries: messages,
            senderId: this.userId,
            senderMachine: machineId,
        };

        const result = await api.inbox.accept(payload);

        if (result.success) {
            // TODO: Send event for chat refresh
            return true;
        }
        return false;

    }

}

// const localUser = new User();

// export default localUser;
