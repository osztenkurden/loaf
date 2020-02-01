export interface IEventResponseObject {
    event: string;
    data: any;
}

export type IEventResponse = IEventResponseObject | null;

export interface IMessage {
    id?: number;
    senderId: number;
    content: any;
    my: boolean;
    date: string;
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
    body: string;
}

export interface IRegisterPayload {
    machineId: number;
    username: string;
    password: string;
    firstName: string;
    identityKey: string;
    registrationId: number;
    keys: {
        generator: string;
        prime: string;
        public: string;
    };
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
