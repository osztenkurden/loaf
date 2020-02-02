import { List, SwipeableDrawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
// import moment from "moment";
import React, { Component } from "react";
import * as I from "../../../modules/interface";
import api from "./../../API";
import * as Loaf from "./../../API/Loaf";
import logo from "./../../Theme/assets/load_icon.svg";
import Chat from "./../Chat/Chat";
import ChatsListEntry from "./../Chat/ChatsListEntry";

interface IState {
    drawer: boolean;
    chats: I.IChat[];
    currentChat: I.IChat | null;
}

export default class Main extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            chats: [],
            currentChat: null,
            drawer: false,
        };
    }
    public async componentDidMount() {
        Loaf.on("chats", (chats: I.IChat[]) => {
            this.setState({ chats });
        });
        Loaf.on("messages", (messages: I.IMessage[], chatId: number, isNew?: boolean) => {
            const chats = this.state.chats.map((chat) => {
                if (chat.id !== chatId) {
                    return chat;
                }
                chat.messages = messages;
                return chat;
            });
        })
        api.chats.get();
    }
    public requestTestFriend = async () => {
        api.user.add(1);
    }
    public acceptInvitation = async (chatId: number) => {
        // await api.chats.accept(chatId, this.props.cxt);
        // this.loadChats();
    }
    public toggleDrawer = () => {
        this.setState((state) => ({ ...state, drawer: !state.drawer }));
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
                            <div onClick={this.requestTestFriend}>Add Friend</div>
                            <div /*onClick={/*() => this.loadMessages(1)}*/>Get messages</div>
                        </List>
                    </div>
                    <Chat chat={this.state.currentChat} />
                </div>
            </div>
        );
    }
    private loadChat = (chat: I.IChat) => {
        this.setState({ currentChat: chat });
    }
}
