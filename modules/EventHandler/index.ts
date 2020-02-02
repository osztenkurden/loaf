import * as Machine from "./../Machine";
import User from "./../User";
import * as Loaf from "./handler";
import * as I from "./../interface";

export const start = (win: Electron.WebContents) => {
    User.assign(win);

    // TODO: remove unnecessary event responses

    Loaf.on("getMachineId", () => {
        const machineId = Machine.getMachineId();

        return { event: "getMachineId", data: machineId };
    });

    Loaf.on("getUser", () => {

        return { event: "user", data: User.getUser() };
    });

    Loaf.onAsync("addUser", async (userId: number) => {
        const inbox = User.getInbox();

        await inbox.addFriend(userId);

        return { event: "userAdded", data: true };
    });

    Loaf.onAsync("acceptChat", async (chatId: number) => {
        const inbox = User.getInbox();
        const result = await inbox.acceptChat(chatId);
        if (result) {
            await inbox.loadChats();
        }
        return { event: "acceptInvitation", data: null };
    });

    Loaf.onAsync("getChats", async () => {
        const inbox = User.getInbox();
        await inbox.loadChats();

        return { event: "chatsLoaded", data: true };
    });

    Loaf.onAsync("sendMessage", async (chatId: number, message: I.IMessageContent) => {
        const inbox = User.getInbox();
        await inbox.sendToChat(chatId, message);
        return null;
    })

    Loaf.onAsync("register", async (username: string, password: string, name: string) => {
        const result = await User.register(username, password, name);

        return { event: "userCreated", data: result };
    });

    Loaf.onAsync("authenticateUser", async (authCode: number) => {
        const status = await User.authenticate(authCode);

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("logInUser", async (username: string, password: string) => {
        const status = await User.logIn(username, password);

        return { event: "userStatus", data: status };
    });

    Loaf.onAsync("loadUser", async () => {
        await User.loadUser();
        return { event: "user", data: User.getUser() };
    });
};
