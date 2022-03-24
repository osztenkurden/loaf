export interface IEventResponseObject {
    event: string;
    data: any;
}

export type IEventResponse = IEventResponseObject | null;

export interface IPreKeyBundle {
    registrationId: number;
    identityKey: ArrayBuffer;
    signedPreKey: {
        keyId: number;
        publicKey: ArrayBuffer;
        signature: ArrayBuffer;
    };
    preKey: {
        keyId: number;
        publicKey: ArrayBuffer;
    };
}

export interface CallDescription {
    offerOrAnswer: any // RTCSessionDescriptionInit,
    target: string;
    type?: 'invite' | 'accept' |'answer';
}
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
    reference: IMessageInputWithUUID | null;
}   


/** Types of messages that can be sent parrallel as one message */
export type IMessageContentPackage = IMessageContentFile | IMessageContentText;

/** Mixed message, can be combined from IMessageContentPackage */
export type IMessageContentMixed = {
    type: "mixed";
    content: IMessageContentPackage[]
}

type IMessageContents = IMessageContentText | IMessageContentFile | IMessageContentMixed | IMessageContentReply;

export type IMessageContentTopLevel<T> = T & {
    uuid: string;
}
export type IMessageContent = IMessageContentTopLevel<IMessageContents>;



/** INPUT TYPES MAPPING, anything that goes into the db basically */

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

export type IMessageContentInput = IMessageContentTextInput | IMessageContentFileInput | IMessageContentMixedInput | IMessageContentReplyInput;

export type IMessageContentInputWithUUID = IMessageContentTopLevel<IMessageContentInput>

/** END OF INPUT TYPES */


export interface IMessagePayload {
    content: IMessageContentInputWithUUID;
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

export interface IMessageInput {
    uuid: string;
    id?: number;
    senderId: number;
    content: IMessageContentInput;
    chatId: number;
    my: boolean;
    date: string;
    sender?: {
        id: number;
        username: string;
    }
}
export interface IMessageInputWithUUID {
    uuid: string;
    id?: number;
    senderId: number;
    content: IMessageContentInputWithUUID;
    chatId: number;
    my: boolean;
    date: string;
    sender?: {
        id: number;
        username: string;
    }
}

export type IAnyMessage = (IMessage | IMessageInput | IMessageInputWithUUID) & {
    temporary?: boolean;
}
export interface IChat {
    id: number;
    name: string;
    last: IMessage | null;
    image: boolean;
    creatorId: number;
    private: boolean;
    status: number;
    users: IUser[];
    unread: boolean;
    messages: IMessage[];
}

export interface IPage {
    page: number;
    messages: IMessage[];
    maxPage: number;
}
export interface IChatPaged {
    id: number;
    name: string;
    last: IMessage | null;
    image: boolean;
    creatorId: number;
    private: boolean;
    status: number;
    users: IUser[];
    unread: boolean;
    pages: IPage[];
}

export interface IUser {
    admin?: boolean;
    id?: number;
    username: string;
    password: string;
    firstName: string;
    registrationId: number;
    identityKey: string;
    banned?: boolean;
    lastName?: string;
}

export interface IServerResponse {
    data?: any;
    success: boolean;
    status: number;
    errors?: string[];
    unauthorized?: boolean;
}

export interface IStatusListener {
    status: number;
    listener: () => void;
}

export interface ISignalEncrypted {
    type: number;
    content: string;
    body: string;
    recipientId: number;
    machineId: number;
    entry: boolean;
}

export interface IMachine {
    userId: number;
    machineId: number;
}

export interface IKeyObject {
    privKey: ArrayBuffer;
    pubKey: ArrayBuffer;
    signature?: ArrayBuffer;
    keyId: number;
}

export interface IRegisterResponse {
    publicKey: Buffer;
    id: number;
}


export interface IKeys {
    generator: string;
    prime: string;
    public: string;
}

export interface IKeyPackage {
    generator: string;
    prime: string;
    private: string;
    public: string;
}

export interface IDebugKeys {
    token: string
}

export interface IRegisterPayload {
    machineId: number;
    username: string;
    password: string;
    firstName: string;
    identityKey: string;
    registrationId: number;
    keys: IKeys | IDebugKeys;
    preKeys: {
        pubKey: string;
        keyId: number;
    }[];
    signedPreKey: {
        pubKey: string;
        signature: string;
        keyId: number;
    };
}
