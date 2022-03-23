/** File contents meta info */
export type IMessageContentFileMeta = {
    data: string,
    size: number,
    name: string,
}

/** Simple message types */
export type IMessageContentFile = {
    type: "file";
    content: IMessageContentFileMeta;
}

export type IMessageContentText = {
    type: "text";
    content: string;
}

export type IMessageContentReply = {
    type: "reply",
    content: IMessageContentText | IMessageContentFile | IMessageContentMixed;
    reference: IMessageContent;
}   


/** Types of messages that can be sent parrallel as one message */
export type IMessageContentPackage = IMessageContentFile | IMessageContentText;

/** Mixed message, can be combined from IMessageContentPackage */
export type IMessageContentMixed = {
    type: "mixed";
    content: IMessageContentPackage[]
}

type IMessageContents = IMessageContentText | IMessageContentFile | IMessageContentMixed | IMessageContentReply;

type IMessageContentTopLevel<T> = T & {
    uuid: string;
}
export type IMessageContent = IMessageContentTopLevel<IMessageContents>;



/** INPUT TYPES MAPPING */

/** File contents meta info */
export type IMessageContentFileMetaInput = IMessageContentFileMeta;

/** Simple message types */
export type IMessageContentFileInput = IMessageContentFile;

export type IMessageContentTextInput = IMessageContentText;

export type IMessageContentReplyInput = {
    type: "reply",
    content: IMessageContentTextInput | IMessageContentFileInput | IMessageContentMixedInput;
    reference: string;
}   


/** Types of messages that can be sent parrallel as one message */
export type IMessageContentPackageInput = IMessageContentFileInput | IMessageContentTextInput;

/** Mixed message, can be combined from IMessageContentPackage */
export type IMessageContentMixedInput = {
    type: "mixed";
    content: IMessageContentPackageInput[]
}

type IMessageContentsInput = IMessageContentTextInput | IMessageContentFileInput | IMessageContentMixedInput | IMessageContentReplyInput;

export type IMessageContentInput = IMessageContentsInput;

/** END OF INPUT TYPES */


export interface IMessagePayload {
    content: IMessageContent;
    recipientId: number;
    machineId: number;
}

export interface IMessageRaw {
    id: number;
    senderId: number;
    recipientId: number;
    chatId: number;
    content: string;
    type: number;
    machineId: number;
    read: boolean;
    senderMachine: number;
    entry: boolean;
    createdAt: string;
}

export interface IMessage {
    uuid: string;
    id?: number;
    senderId: number;
    content: IMessageContent;
    chatId: number;
    my: boolean;
    date: string;
    sender?: {
        id: number;
        username: string;
    }
}
export type IAnyMessage = IMessageContentInput & {
    temporary?: boolean;
}
