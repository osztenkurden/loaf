import crypto from "crypto";
import base32 from "thirty-two";
import { api } from "../API";
import * as I from "../interface";
import Storage from "../Storage";
import * as Loaf from "./../EventHandler/handler";
// import * as Machine from "../Machine";

export default class Inbox {
    private chats: I.IChat[];
    private content: Electron.WebContents;

    constructor(content: Electron.WebContents) {
        this.chats = [];
        this.content = content;
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

}

// const localUser = new User();

// export default localUser;
