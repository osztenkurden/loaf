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

export type IMessageContent = IMessageContentText | IMessageContentImage | IMessageContentMixed;

interface IMessageContentText {
    type: "text";
    content: string;
}

interface IMessageContentImage {
    type: "image";
    content: string;
}

interface IMessageContentMixed {
    type: "mixed";
    content: IMessageContentPackage[]
}

type IMessageContentPackage = IMessageContentImage | IMessageContentText;

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
    sender?: {
        id: number;
        username: string;
        avatar: string | null;
    }
}

export interface IMessage {
    id?: number;
    senderId: number;
    content: IMessageContent;
    chatId: number;
    my: boolean;
    date: string;
    sender?: {
        id: number;
        username: string;
        avatar: string | null;
    }
}

export interface IChat {
    id: number;
    name: string;
    last: IMessage | null;
    image: boolean;
    creatorId: number;
    private: boolean;
    status: number;
    unread: boolean;
    messages: IMessage[];
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
    preKeys: Array<{
        pubKey: string;
        keyId: number;
    }>;
    signedPreKey: {
        pubKey: string;
        signature: string;
        keyId: number;
    };
}
