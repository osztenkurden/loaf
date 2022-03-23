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
export interface IMessagePayload {
    content: IMessageContent;
    recipientId: number;
    machineId: number;
}
/*
export interface IMessageContent {
    type: "text" | "image";
    content: string;
}*/

export type IMessageContentLocal = IMessageContentText | IMessageContentFile | IMessageContentMixed;

export type IMessageContentTopLevel<T> = T & {
    uuid: string;
}
export type IMessageContent = IMessageContentTopLevel<IMessageContentLocal>;

export interface IMessageContentText {
    type: "text";
    content: string;
}

export interface IMessageContentFileMeta {
    data: string,
    size: number,
    name: string,
}

export interface IMessageContentFile {
    type: "file";
    content: IMessageContentFileMeta;
}


export interface IMessageContentMixed {
    type: "mixed";
    content: IMessageContentPackage[]
}

export type IMessageContentPackage = IMessageContentFile | IMessageContentText;

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
export interface IMessageLocal extends Omit<IMessage, 'content'> {
    content: IMessageContent | IMessageContentLocal;
}
export interface IAnyMessage extends IMessageLocal {
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
