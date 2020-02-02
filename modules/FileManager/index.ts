import path from "path";
import fs from "fs";
import { directories } from "./../Machine";
import * as I from "./../interface";

export default class FileManager {
    userId: number;

    constructor(userId: number) {
        this.userId = userId;
    }

    public getMessages(chatId: number, amount = 20) {
        const messages = this.getChatFile(chatId).splice(-amount);
        return messages;
    }

    public saveMessage(message: I.IMessage, chatId: number) {
        this.append(chatId, message);
    }

    private getChatDirectory(chatId: number) {
        const chatPath = path.join(directories.messages, `chat_${chatId}_${this.userId}`);

        if (!fs.existsSync(chatPath)) {
            fs.mkdirSync(chatPath);
        }
        return chatPath;
    }

    private getChatFile(chatId: number, number?: number){
        const chatDirectory = this.getChatDirectory(chatId);
        const year = number || (new Date()).getUTCFullYear();

        const filePath = path.join(chatDirectory, `messages_${year}.loaf`);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "[]", "utf8");
        }
        return filePath as I.IMessage[];
    }

    private append(chatId: number, message: I.IMessage) {
        let content: I.IMessage[] = [];
        const file = fs.readFileSync(this.getChatFile(chatId), "utf8");
        try {
            const saved = JSON.parse(file) as I.IMessage[];
            if (Array.isArray(saved)){
                content.push(...saved)
            }
        } catch {
            /** */
        }
        content.push(message);
        fs.writeFileSync(this.getChatFile(chatId), JSON.stringify(content), "utf8");
    }
}