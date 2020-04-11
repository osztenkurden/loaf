import * as I from "./../interface";
import Loaf from "./LoafAPI";

export const api = {
    inbox: {
        accept: (payload: any) => Loaf("chats/users", "PATCH", { messages: payload, chatId: payload.chatId}),
        addFriend: (userId: number) => Loaf("chats?private=true", "POST", { name: "", users: [userId]}),
        getChats: () => Loaf("chats"),
        createTestChat: () => Loaf("chats", "POST", {name: "Bakery", users: [1,2,3]}),
        getReceivers: (chatId: number) => Loaf(`machines/${chatId}`),
    },
    messages:  {
        get: (chatId: number, machineId: number) => Loaf(`messages/${chatId}?machineId=${machineId}`),
        send: (chatId: number, entries: I.ISignalEncrypted[], senderMachine: number) =>
            Loaf(`messages/${chatId}`, "POST", {chatId, entries, senderMachine}),
    },
    user: {
        authenticate: (authcode: number, machineName: string) => Loaf("auth/auth", "POST", { authcode, machineName }),
        get: async (): Promise<I.IUser | null> => {
            const res = await Loaf("auth");
            if (res.data && res.success) {
                return res.data;
            }
            return null;
        },
        getByName: (name: string) => Loaf(`user/${name}`),
        getBundle: (userId: number) => Loaf("keys/bundle", "POST", { userId }),
        // tslint:disable-next-line:max-line-length
        login: (body: {username: string, password: string, machineId: number}) => Loaf("auth/login", "POST", body),
        register: async (payload: I.IRegisterPayload) => {
            const response = await Loaf("auth/register", "POST", payload);
            if (!response.success) {
                return null;
            }
            if (response.data && response.data.publicKey) {
                response.data.publicKey = Buffer.from(response.data.publicKey, "hex");
            }
            return response.data as I.IRegisterResponse;
        },
    },
};
