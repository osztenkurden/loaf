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

export interface IServerError {
    errors: string[];
    unauthorized?: boolean;
}
