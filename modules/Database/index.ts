import sqlite3 from 'sqlite3';
import path from 'path';
import * as I from "./../interface";
import User from './../User';
import fs from 'fs';
import unusedFilename from 'unused-filename';
import { directories } from '../Machine';

import Sequelize, { Model } from 'sequelize';
import { getMessageReference, Reference } from './references';

class Message extends Model {
    static Define(seq: Sequelize.Sequelize) {
        this.init({
            uuid: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4 },
            id: { type: Sequelize.BIGINT },
            senderId: { type: Sequelize.BIGINT },
            content: { type: Sequelize.TEXT,  },
            chatId: { type: Sequelize.BIGINT },
            my: { type: Sequelize.BOOLEAN },
            date: { type: Sequelize.DATE },
            userId: { type: Sequelize.TEXT },
        }, {
            timestamps:false,
            sequelize: seq
        });
    }
}

export const sequelize = new Sequelize.Sequelize({
    dialect: 'sqlite',
    storage: path.join(directories.messages, 'messages.db'),
    logging: false
});

Message.Define(sequelize);
Reference.Define(sequelize);

sequelize.sync({ force: false });
interface IDBMessageRaw {
    uuid: string,
    id?: number;
    senderId: number;
    content: string;
    chatId: number;
    my: number;
    date: string;
    userId: number
}
interface IDBMessagePreRaw {
    uuid: string,
    id?: number;
    senderId: number;
    content: string;
    chatId: number;
    my: number;
    date: Date;
    userId: number
}


const convertRawMessage = (chats: I.IChatPaged[] = []) => (raw: IDBMessageRaw): I.IMessageInputWithUUID | null => {
    const inbox = User.getInbox();
    if(!inbox) return null;
    return {
        uuid: raw.uuid,
        id: raw.id,
        senderId: raw.senderId,
        content: JSON.parse(raw.content),
        chatId: raw.chatId,
        my: !!raw.my,
        date: raw.date,
        sender: inbox.getSenderData(raw.chatId, raw.senderId, chats)

    }
};

const convertToRaw = (userId: number, message: I.IMessageInputWithUUID): IDBMessagePreRaw => {
    return {
        id: message.id,
        senderId: message.senderId,
        content: JSON.stringify(message.content),
        chatId: message.chatId,
        my: Number(message.my),
        date: new Date(message.date),
        userId,
        uuid: message.uuid
    }
}

export const getMessage = async (uuid: string) => {
    const rawMessage = await Message.findOne({
        where: {
            uuid
        },
        raw: true,
        order: [['date', 'ASC']]
    }) as unknown as IDBMessageRaw;

    if(!rawMessage) return null;

    const message = convertRawMessage()(rawMessage);

    return message || null;
}

const isReply = (content: I.IMessageContentInputWithUUID): content is I.IMessageContentTopLevel<I.IMessageContentReplyInput> => content.type === "reply";

export const parseContent = async (content: I.IMessageContentInputWithUUID): Promise<I.IMessageContent> => {
    if(!isReply(content)){
        return content;
    }

    const reference = await getMessageReference(content.reference);

    if(!reference) return { ...content, reference: null }
    
    const replyTo = await getMessage(reference.dbUUID);

    return { ...content, reference: replyTo || null }
}

const saveFileMessage = async (fileMessage: I.IMessageContentFile) => {

    const filePath = await unusedFilename(path.join(directories.files, fileMessage.content.name));
    
    let data = fileMessage.content.data;
    if(data.includes(",")){
        data = data.split(",")[1];
    } 

    fs.writeFileSync(filePath, data, 'base64');
    return filePath;
}

export const saveFileToDrive = async (message: I.IMessage | I.IMessageInputWithUUID) => {
    if (message.content.type === "text" || message.content.type === 'reply') return message;
    if (message.content.type === "file") {
        message.content.content.data = await saveFileMessage(message.content);
        return message;
    }
    await Promise.all(message.content.content.map(async messageContent => {
        if (messageContent.type === "file") {
            messageContent.content.data = await saveFileMessage(messageContent);
        }
        return messageContent;
    }));
    return message;
}

export const saveMessages = async (userId: number, messages: I.IMessageInputWithUUID[]) => {
    const rawMessages = messages.map(msg => convertToRaw(userId, msg));

    try {
        return await Message.bulkCreate(rawMessages)
    } catch(e) {
        console.log(e);
        return null;
    }
}

const MESSAGES_PER_PAGE = 15;

export const getMessages = async (userId: number, chatId: number, pageFromEnd = 0, chats: I.IChatPaged[] = [], useLiteralPage = false) => {
    const messageCount = await Message.count({
        where: {
            userId,
            chatId
        }
    });
    // Page count starts from 0
    const maxPage = Math.ceil(messageCount/MESSAGES_PER_PAGE)-1;

    const page = !useLiteralPage ? (maxPage - pageFromEnd) : pageFromEnd;
    const messages = await Message.findAll({
        where: {
            userId,
            chatId
        },
        limit: MESSAGES_PER_PAGE+1,
        offset: page*MESSAGES_PER_PAGE,
        raw: true,
        order: [['date', 'ASC']]
    }) as unknown as IDBMessageRaw[];
    const filteredMessages = messages.slice(0,MESSAGES_PER_PAGE).map(convertRawMessage(chats)).filter((message): message is I.IMessageInputWithUUID => !!message);

    const messagesWithReferences: I.IMessage[] = [];

    for(const message of filteredMessages){
        messagesWithReferences.push({...message, content: await parseContent(message.content)})
    }

    // const hasMore = messages.length > MESSAGES_PER_PAGE;
    return { messages: messagesWithReferences, page, maxPage } as I.IPage;
}

