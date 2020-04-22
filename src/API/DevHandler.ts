class ActionHandler {
    actions: Map<string, Function>;
    constructor(){
        this.actions = new Map();
    }
    init(){

    }
    on(eventName: string, callback: (...args: any[]) => any){
        this.actions.set(eventName, callback);
    }
    execute(eventName: string, ...args: any[]){
        const action = this.actions.get(eventName);
        if(!action) return null;
        return action(...args);
    }
}
class IPCRenderer {
    actions: Map<string, Function>;
    constructor(){
        this.actions = new Map();
    }
    sendSync(eventName: string, ...args: any[]){
        return Dev.execute(eventName, ...args);
    }
    send(eventName: string, ...args: any[]){
        return Dev.execute(eventName, ...args);
    }
    on(eventName: string, callback: (event: any, ...args: any) => void){
        this.actions.set(eventName, callback)
    }
    execute(eventName: string, ...args: any[]){
        const action = this.actions.get(eventName);
        if(!action) return null;
        return action(null, ...args);
    }


}
const devIpcRenderer = new IPCRenderer();
const Dev = new ActionHandler();

Dev.on("getUser", () => {
    return {
        admin: false,
        id: 1,
        username: 'Test User',
        firstName: 'Jan',
        registrationId: 34,
        identityKey: 'ddd',
        banned: false,
        lastName: 'Kowalsky'
    }
});

Dev.on("getChats", () => {
    const messages = [{
        id: 1,
        senderId: 1,
        content: {
            type: "text",
            content:"HEHJKa"
        },
        chatId: 1,
        my: true,
        date: new Date(),
        sender: {
            id: 1,
            username: 'Test User #1',
            avatar: null
        }
    }]
    const chats = [{
        id:1,
        name: 'Bakery',
        last: messages[0],
        image: false,
        creatorId: 1,
        private: false,
        status: 2,
        users: [],
        unread: false,
        messages
    }]
    devIpcRenderer.execute("chats", chats);
})

function fakeRequire(){
    return {
        ipcRenderer: devIpcRenderer,
        remote: {
            getCurrentWindow: () => ({
                minimize: () => {console.log('minimize')},
                isMaximized: () => {console.log('what')},
                restore: () => {console.log('restore')},
                maximize: () => {console.log('maximize')},
                close: () => {console.log('close')},
            })
        }
    }
}


export {devIpcRenderer}
export default fakeRequire;