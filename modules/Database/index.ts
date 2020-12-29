import sqlite3 from 'sqlite3';
import path from 'path';
import * as I from "./../interface";
import User from './../User';
import fs from 'fs';
import unusedFilename from 'unused-filename';
import { directories } from '../Machine';

interface IDBMessageRaw {
    id: number;
    senderId: number;
    content: string;
    chatId: number;
    my: number;
    date: string;
    userId: number
}


const getMessagesDB = () => {
    const db = new (sqlite3.verbose()).Database(path.join(directories.messages, 'messages.db'));
    return db;
};

const convertRawMessage = (raw: IDBMessageRaw): I.IMessage => {
    const inbox = User.getInbox();
    return {
        id: raw.id,
        senderId: raw.senderId,
        content: JSON.parse(raw.content),
        chatId: raw.chatId,
        my: !!raw.my,
        date: raw.date,
        sender: inbox.getSenderData(raw.chatId, raw.senderId)

    }
};

const convertToRaw = (userId: number, message: I.IMessage): IDBMessageRaw => {
    return {
        id: message.id,
        senderId: message.senderId,
        content: JSON.stringify(message.content),
        chatId: message.chatId,
        my: Number(message.my),
        date: message.date,
        userId
    }
}

export const saveFileToDrive = async (message: I.IMessage) => {
    const saveFileMessage = async (fileMessage: I.IMessageContentFile) => {
        // TODO: Add proper directory
        let filePath = await unusedFilename(`XD/${fileMessage.content.name}`);
        fs.writeFileSync(filePath, fileMessage.content.data, 'base64');
        return filePath;
    }
    if(message.content.type === "text") return message;
    if(message.content.type === "file") {
        message.content.content.data = await saveFileMessage(message.content);
        return message;
    }
    await Promise.all(message.content.content.map(async messageContent => {
        if(messageContent.type === "file"){
            messageContent.content.data = await saveFileMessage(messageContent);
        }
        return messageContent;
    }));
    return message;
}

export const saveMessages = (userId: number, messages: I.IMessage[]) => {
    const rawMessages = messages.map(msg => convertToRaw(userId, msg));

    const db = getMessagesDB();

    /**
     * TODO: Inserting the messages to database
     */
}

export const getLastMessages = (userId: number, chatsId: number[], lastLoadedTimeStamp?: string): Promise<I.IMessage[]> => new Promise((res, rej) => {
    const db = getMessagesDB();

    db.all("SELECT * FROM messages WHERE chatId IN ? AND userId = ? AND datetime(date) < datetime(?) LIMIT 20", [chatsId, userId, lastLoadedTimeStamp || 'now'], (err, rows: IDBMessageRaw[]) => {
        const messages = rows.map(convertRawMessage);
        return res(messages);
    });
});
