import { api } from "../API";
import { getMessages, saveFileToDrive, saveMessages } from "../Database";
import * as I from "../interface";
import * as Machine from "../Machine";
import Storage from "../Storage";
import { v4 as uuid } from 'uuid';
import { BrowserWindow, Notification } from "electron";
import { existsSync } from "fs";
import path from 'path';
// import * as Machine from "../Machine";

export default class Inbox {
    private chats: I.IChatPaged[];
    private content: Electron.WebContents;
    private userId: number;
    private storage: Storage;
    private messages: Map<number, I.IMessage[]>;

    constructor(content: Electron.WebContents, userId: number, storage: Storage) {
        this.chats = [];
        this.content = content;
        this.userId = userId;
        this.storage = storage;
        this.messages = new Map();
        this.loadChats(true);
    }

    public addFriend = async (userId: number) => {
        await api.inbox.addFriend(userId);

        return this;
    }

    public loadChats = async (init?: boolean) => {
        const response = await api.inbox.getChats();
        if (response.success && response.data) {
            const chats = response.data.chats as I.IChatPaged[];
            for (const chat of chats) {
                const newestPage = await getMessages(this.userId, chat.id, 0, chats);
                // const inboxedMessages = this.messages.get(chat.id);
                // const savedMessages = init ? (await getMessages(this.userId, chat.id, 0, chats)).messages : [];

                this.messages.set(chat.id, newestPage.messages);

                chat.pages = [newestPage];
            }
            this.chats = chats;
        }
        this.content.send("chats", this.chats);
        if(init){
            this.loadAllMessages();
        }
        // Loaf.send("chats", this.chats);
        return this;
    }

    public loadMessagesFromPage = async (chatId: number, page: number) => {
        const chat = this.chats.find(entry => entry.id === chatId);

        if(!chat) return;

        const pageEntry = await getMessages(this.userId, chatId, page, [], true);

        this.content.send("chatPage", { chatId, pageEntry });
    }

    public async sendToChat(chatId: number, msg: I.IMessageContent, localUUID: string) {
        const receivers = await this.getReceivers(chatId);
        const entries: I.ISignalEncrypted[] = [];
        for (const receiver of receivers) {
            const payload: I.IMessagePayload = {
                content: msg,
                machineId: receiver.machineId,
                recipientId: receiver.userId,
            };
            const entry = await this.prepareMessage(payload);
            if(entry) entries.push(entry);
        }
        const message: I.IMessage = {
            uuid: uuid(),
            senderId: this.userId,
            content: msg,
            chatId,
            my: true,
            date: (new Date()).toISOString(),
        }
        const result = await api.messages.send(chatId, entries, Machine.getMachineId());

        if (result.success) {
            const current = this.messages.get(chatId) || [];

            current.push(message);
            this.messages.set(chatId, current);
            this.content.send("chats", this.chats, localUUID);
            await saveMessages(this.userId, [message]);
        } else {
            console.log(result);
        }

        return result;
    }

    public async acceptChat(chatId: number) {
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
            this.loadChats();
            return true;
        }
        return false;
    }

    public async loadAllMessages() {
        for(const chat of this.chats){
            await this.loadMessages(chat.id, true);
        }
        this.loadChats();
    }

    public async loadMessages(chatId: number, init = false) {
        if(!init) await this.loadChats();
        const response = await api.messages.get(chatId, Machine.getMachineId());
        if (!response.success || !response.data) {
            return null;
        }
        const messages = (response.data.messages || []) as I.IMessageRaw[];
        const current = this.messages.get(chatId) || [];
        const incoming: I.IMessage[] = [];
        for (const rawMessage of messages) {
            const decrypted = await this.storage.decodeMessage(rawMessage);
            if (!decrypted) {
                continue;
            }

            const date = (rawMessage as any).createdAt;

            const message: I.IMessage = {
                uuid: uuid(),
                chatId,
                content: decrypted,
                date,
                my: rawMessage.senderId === this.userId,
                senderId: rawMessage.senderId,
                sender: this.getSenderData(chatId, rawMessage.senderId),
            };
            await saveFileToDrive(message);
            current.push(message);
            incoming.push(message);
        }

        await saveMessages(this.userId, incoming);
        this.messages.set(chatId, current);

        if(!init) await this.loadChats();

        const window = BrowserWindow.fromWebContents(this.content);

        if(!window || window.isFocused()) return;

        if(window.isVisible()){
            window.flashFrame(true);
            return;
        }

        for(const message of incoming){
            if(!message.sender) continue;
            const chat = this.chats.find(chat => chat.id === message.chatId);

            if(!chat) continue;

            const iconPath = path.join(Machine.directories.images, `${chat.id}.png`);

            const icon = existsSync(iconPath) ? iconPath : undefined;

            const notification = new Notification({ title: chat.name, body: `${message.sender.username} sent new message`, icon});

            notification.on('click', () => {
                window.show();
                window.focus();
            });

            notification.show();
        }
    }

    public getSenderData(chatId: number,senderId: number, chats: I.IChatPaged[] = []) {
        const chat = this.chats.find(chatEntry => chatEntry.id === chatId) || chats.find(chatEntry => chatEntry.id === chatId);
        if(!chat) return undefined;

        const senderData = chat.users.find(user => user.id === senderId);
        if(!senderData || !senderData.id)  return undefined;

        return {
            id: senderData.id,
            username: senderData.username
        }
    }

    private async prepareMessage(msg: I.IMessagePayload, bundle?: I.IPreKeyBundle) {

        const encrypted = await this.storage.encodeMessage(msg.content, msg.recipientId, msg.machineId, bundle);

        return encrypted;
    }

    private async getReceivers(chatId: number) {
        const response = await api.inbox.getReceivers(chatId);
        if (!response.status || !response.data) {
            return [];
        }
        // const store = this.storage.getStore();
        const machineId = Machine.getMachineId();
        const machines = response.data.machines as I.IMachine[];
        if(!machines){
            console.log(response);
            return [];
        }
        const receivers = machines.filter((mch) => mch.userId !== this.userId || mch.machineId !== machineId);

        return receivers;
    }

}
