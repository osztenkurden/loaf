import { api } from "../API";
import { saveFileToDrive, saveMessages } from "../Database";
import * as I from "../interface";
import * as Machine from "../Machine";
import Storage from "../Storage";

// import * as Machine from "../Machine";

export default class Inbox {
    private chats: I.IChat[];
    private content: Electron.WebContents;
    private userId: number;
    private storage: Storage | null;
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
            const chats = response.data.chats as I.IChat[];

            for (const chat of chats) {
                let messages = this.messages.get(chat.id);
                if (!messages) {
                    this.messages.set(chat.id, []);
                    messages = [];
                }
                chat.messages = messages;
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

    public async sendToChat(chatId: number, msg: I.IMessageContent) {
        const receivers = await this.getReceivers(chatId);
        const entries: I.ISignalEncrypted[] = [];
        for (const receiver of receivers) {
            const payload: I.IMessagePayload = {
                content: msg,
                machineId: receiver.machineId,
                recipientId: receiver.userId,
            };
            const entry = await this.prepareMessage(payload);
            entries.push(entry);
        }
        const message: I.IMessage = {
            senderId: this.userId,
            content: msg,
            chatId,
            my: true,
            date: (new Date()).toISOString(),
        }
        const result = await api.messages.send(chatId, entries, Machine.getMachineId());

        if (result.success) {
            const current = this.messages.get(chatId);
            current.push(message);
            this.messages.set(chatId, current);
            this.content.send("chats", this.chats);
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

            // TODO: Check saving files in messages here and fix dates of messages

            const message: I.IMessage = {
                chatId,
                content: decrypted,
                date: (new Date()).toISOString(),
                my: rawMessage.senderId === this.userId,
                senderId: rawMessage.senderId,
                sender: this.getSenderData(chatId, rawMessage.senderId),
            };
            await saveFileToDrive(message);
            current.push(message);
            incoming.push(message);
        }

        // TODO: Check saving to DB here
        
        saveMessages(this.userId, incoming);
        this.messages.set(chatId, current);

        if(!init) this.loadChats();
    }

    public getSenderData(chatId: number,senderId: number) {
        const chat = this.chats.find(chat => chat.id === chatId);
        if(!chat) return null;
        const senderData = chat.users.find(user => user.id === senderId);
        if(!senderData || !senderData.id) return null;
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
        const receivers = machines.filter((mch) => mch.userId !== this.userId || mch.machineId !== machineId);

        return receivers;
    }

}
