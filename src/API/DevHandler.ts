/* tslint:disable */
import { IMessage } from "../../modules/interface";

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
    const messages: IMessage[] = [{
        id: 1,
        senderId: 1,
        content: {
            type: "mixed",
            content: [
                {
                    type:"text",
                    content:"XD"
                },
                {
                    type: "file",
                    content:{
                        data: "data:audio/wav;base64,UklGRuTFHgFXQVZFSlVOSxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        size: 69,
                        name: 'xdf.mp3'
                    }
                },
                {
                    type: "file",
                    content:{
                        data: "data:audiox/wav;base64,UklGRuTFHgFXQVZFSlVOSxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        size: 69,
                        name: 'xdfasdasdasd.mp3'
                    }
                },
                {
                    type: "file",
                    content:{
                        size: 69,
                        name: 'sdfsdfs',
                        data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAQAAAD+k96sAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkAg8WFhR9Sw5qAAAD4klEQVR42u2bTWhVRxSAv/jEkPeoxp+ApqGgtMFoRKORRCzSRcG0Cy0tuCh0WySCdtdEKuJGrcSFIAhtQcGAFFpL4kLQ2ig1pC30h9dU8AeiRpqfFqttjTGa3C4erUWomXPvnXvvKecbyGrezHyZmXfPnDsPDMMwDCN2yry2nmcVK3iOGmqoJk8FFVQwxQPGGed3hhhmiBv08xO/aBStpIWNrGUpOefPjPI1PfRQZErDCplNK1/wkCB0GeUIGzyvtIg08CF/RlD8dxlkJ/OyKLmKrpgUH5d7HGZRliSr+Zip2DVL5Q/aKc/Gt/ZW7nqS/LtcoyltzQV87lmyVB7Sxoz0NNdwIxHNUvkkrSX8KvcT1AwIOM+c5DU38SBhzYCAPiqSns2JFDQDAj4Lu1dzIT5Tz+mk/7P/sJRZnEvqm/Z6SrNZKpOsT0b001Q1S8/VvH/Nt1LXDAho8605n98yIXqbSunQZ4pq75J3AMA4PVzkO64zzBhlzKWS+aykmWZeCNHeXHawx998Lgn17LxCK4WntNrIsRChx6DPkPCDEMN53WlAz3JG3HaLv/05JhxKp2Chl7GDR6LWj/sSbRdqbhf3sIVJQftDvkSviDTfCdXHe6I+lvnJB0mG8H7IXnJ8K+jlbR+i+wUD6I9wcmwR9HPQh+iPzt0/ojFST9ecezoVv2aVIPnVGbGvA4KVI8DtsfuSIKHcEVH0onPNOfGLumfhivwQUfSyc81n4hetd26vO/I2+dm5ZiF+0RXO7V2ILDrmXFP0Mmqm4x4tUKBAftq/xcii7vN0P37Rqwlmhdzj4zvxL91k01+u3NItutq55oBu0c3ONb9HMbWCWHe9ZtETggRZTq/mi4KY+qhezdkMCBbuGq2aM+gWaPbqnc8OUQ5ji1bNXSLN3mzfQ/pv9oo0JwSnqQxRzjFhInWfRs2F9Ak1v2SWPs1Gbgk1B6jSp7mNcaHmHUEKICNUclL8WulXfUFCU4h7EEMs16bZGuI9az9LdEnm6QzxMrlLltpMnxqKIa7b7NEWB9WG2JkjvKxtZzYwItY8l60b2C6sE19fnuDdDGa0pmEZt4WalzUerKu4KdT8SPZeJSuZg7PCMO8NnWdN2W2WIs/r1KwTBe4nkri36YfzAs1DWhMk8JpAc7fevF4ZlwSzqZhXBBdpcppFTztq3tR2Nnkyh+D6K9LNqOZN57Omco46ijZoF3U7Yn+TXCTqh3LqnOp1axdd7Hix5yvtotWO9S5pF3VLgQSMYhiGYRiGYRh+8JVJDVIfQUJBfeYwURM1URM1URM1URM1URM1URM1URM1URM1DOP/zl+IROP1bg+NpwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMi0xNVQyMjoyMjoyMCswMDowMBpZaTEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDItMTVUMjI6MjI6MjArMDA6MDBrBNGNAAAAAElFTkSuQmCC"
                    }
                }
            ]
        },
        chatId: 1,
        my: true,
        date: new Date().toISOString(),
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