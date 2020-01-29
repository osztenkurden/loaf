import { List, SwipeableDrawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import moment from "moment";
import React, { Component } from "react";
import * as I from "../../../modules/interface";
import Chat from "../Chat/Chat";
import ChatsListEntry from "../Chat/ChatsListEntry";
import logo from "./../../Theme/assets/load_icon.svg";
// import { IUserContext } from "./Context";
// import DrawerContent from "./../components/Drawer";
// import api from "./api";

// import * as I from "./definitions/interface";

declare const window: any;
const res: any = {};
const api: any = {};

interface IProps {
    cxt: any;
}

interface IState {
    drawer: boolean;
    chats: I.IChat[];
    currentChat: I.IChat | null;
    messages: any;
    currentMessages: I.IMessage[];
    hash: string;
}

export default class Main extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            chats: [],
            currentChat: null,
            currentMessages: [],
            drawer: false,
            hash: "",
            messages: {},
        };
    }
    public async componentDidMount() {
        return;
        const socket = this.props.cxt.socket;
        if (socket) {
            socket.on("message", (data: any) => {
                if (data.chatId) {
                    this.loadChats();
                    this.loadMessages(data.chatId);
                }
            });
            socket.on("chat", () => {
                this.loadChats();
            });
        }
        await this.props.cxt.loadStore();
        this.loadChats();
        setInterval(() => {
            this.setState({hash: Math.random().toString(36).substr(2, 5)});
        }, 30000);

    }
    public loadChats = async () => {
        const request = await api.chats.get();
        const chats: { chats: I.IChat[] } = request.body;
        this.setState({ chats: chats.chats }, () => {
            if (this.state.currentChat && this.state.currentChat.id) {
                this.loadChat(this.state.currentChat.id);
            }
        });
    }
    public loadChat = (chatId: number) => {
        this.setState({
            currentChat: this.state.chats.filter((chat) => chat.id === chatId)[0] || null,
            currentMessages: this.state.messages[chatId] || [],
        });
    }
    public sendMessage = async (content: string, chatId: number) => {
        const { ipcRenderer } = window.electron;
        await api.chats.sendMessageV2(content, chatId, this.props.cxt);

        if (this.props.cxt && this.props.cxt.user) {
            ipcRenderer.send("saveUserData", this.props.cxt.user.id, this.props.cxt.store.saveToHex());
        }
    }
    public requestFriend = async (userId: number) => {
        // console.log(userId);
        await api.chats.createPrivateChat(userId);
        this.loadChats();
    }
    public acceptInvitation = async (chatId: number) => {
        await api.chats.accept(chatId, this.props.cxt);
        this.loadChats();
    }
    public addMessageToStack = async (content: any, chatId: number) => {
        if (!this.props.cxt.user || !this.props.cxt.user.id) return;
        const messages = this.state.messages[chatId] || [];
        const newMessage = { senderId: this.props.cxt.user.id, content, my: true, date: moment().toISOString() };
        const chats = this.state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;

            return { ...chat, last: newMessage};
        });

        messages.push(newMessage);
        this.setState({ messages: { ...this.state.messages, [chatId]: messages }, chats }, () => {
            if (this.state.currentChat && this.state.currentChat.id === chatId) {
                this.loadChat(chatId);
            }
        });
    }
    public async loadMessages(chatId: number) {
        const { ipcRenderer } = window.electron;
        await this.loadChats();
        // const res = await api.chats.getMessages(chatId, this.props.cxt.machineId);
        if (!res.body) return;
        const messages: any[] = res.body.messages;
        const decipheredMessages = this.state.messages[chatId] || [];
        for (const message of Object.values(messages)) {
            const deciphered = await this.props.cxt.store.decipherMessage(message.senderId,
                message.senderMachine,
                message.content,
                message.type === 3,
            );
            decipheredMessages.push({
                content: deciphered,
                date: message.createdAt,
                id: message.id,
                my: this.props.cxt.user && message.senderId === this.props.cxt.user.id,
                senderId: message.senderId,
            });
        }
        const chats = this.state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;
            if (!decipheredMessages.length) return chat;
            return { ...chat, last: decipheredMessages[decipheredMessages.length - 1]};
        });
        if (this.props.cxt && this.props.cxt.user) {
            ipcRenderer.send("saveUserData", this.props.cxt.user.id, this.props.cxt.store.saveToHex());
        }
        this.setState({ messages: { ...this.state.messages, [chatId]: decipheredMessages }, chats }, () => {
            if (this.state.currentChat && this.state.currentChat.id === chatId) {
                this.loadChat(chatId);
            }
        });
    }
    public toggleDrawer = () => {
        this.setState({ ...this.state, drawer: !this.state.drawer });
    }
    public render() {
        return (
            <div className="loaf-app">
                <AppBar position="fixed" >
                    <Toolbar className="bar">
                        <IconButton className="menuButton" color="inherit" aria-label="Open drawer">
                            <MenuIcon onClick={this.toggleDrawer} />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap className="logo-wrapper">
                            <img src={logo} />
                        </Typography>
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>

                    </Toolbar>
                </AppBar>
                {/*<SwipeableDrawer
                    open={this.state.drawer}
                    onOpen={this.toggleDrawer}
                    onClose={this.toggleDrawer}
                    className="sidenav-container" >
                    <DrawerContent />
                </SwipeableDrawer>*/}
                <div className="playground">
                    <div className="chat-list">
                        <List>
                            {this.state.chats.map((chat) => <ChatsListEntry chat={chat} loadChat={this.loadChat} />)}
                            <div onClick={() => this.requestFriend(6)}>Add Friend</div>
                            <div onClick={() => this.loadMessages(1)}>Get messages</div>
                        </List>
                    </div>
                    <Chat
                        chat={this.state.currentChat}
                        manager={{
                            accept: this.acceptInvitation,
                            addMessageToStack: this.addMessageToStack,
                            sendMessage: this.sendMessage,
                        }}
                        messages={this.state.currentMessages}
                    />
                </div>
            </div>
        );
    }
}
