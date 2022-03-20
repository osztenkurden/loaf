import { AppBar, SwipeableDrawer, IconButton, Toolbar, Typography, Modal } from "@material-ui/core";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import DrawerContent from "./../Drawer";
import React, { Component } from "react";
import * as I from "../../../modules/interface";
import api from "./../../API";
import * as Loaf from "./../../API/Loaf";
import logo from "./../../Theme/assets/load_icon.svg";
import Chat from "./../Chat/Chat";
import ChatList from "./../Chat/ChatsList";
import NewContact from "./../NewContact";
import NewConversation from "./../NewConversation";
import storage, {ChatImageStorage} from "./../../API/ChatImages";
import { scrollToBottom, sortChats } from "Modules/Utils";

interface IState {
    drawer: boolean;
    chats: I.IChatPaged[];
    currentChat: I.IChatPaged | null;
    newContactModal: boolean;
    newConversationModal: boolean;
    storage: ChatImageStorage;
    hash: string,
}

const addPageToChat = (chat: I.IChatPaged, pages: I.IPage[]) => {
    for(const page of pages){
        const existingEntry = chat.pages.find(pageEntry => pageEntry.page === page.page);
        if(!existingEntry){
            chat.pages.push(page);
            continue;
        }
        existingEntry.messages = page.messages;
    }
}

const didLastPageChange = (chat: I.IChatPaged, newPages: I.IPage[]) => {
    const maxNewPage = Math.max(...newPages.map(page => page.page));
    const maxOldPage = Math.max(...chat.pages.map(page => page.page));

    if(maxOldPage > maxNewPage){
        return false;
    }

    const newMaxPageEntry = newPages.find(page => page.page === maxNewPage) as I.IPage;
    const lastPageEntry = chat.pages.find(page => page.page === maxNewPage);

    if(!lastPageEntry){
        return true;
    }

    if(newMaxPageEntry.messages.length !== lastPageEntry.messages.length) return true;

    const currentUUIDs = lastPageEntry.messages.map(message => message.uuid);
    const newUUIDs = newMaxPageEntry.messages.map(message => message.uuid);

    for(const currentUUID of currentUUIDs){
        if(!newUUIDs.includes(currentUUID)){
            return true;
        }
    }
    return false;
}

export default class Main extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            chats: [],
            currentChat: null,
            drawer: false,
            newContactModal: false,
            newConversationModal: false,
            storage: storage.set(() => this.setState({hash: (new Date()).toISOString()})),
            hash: '',
        };
    }
    public async componentDidMount() {
        Loaf.on("chats", (newChats: I.IChatPaged[]) => {
            const { currentChat } = this.state;

            let newInCurrent = false;


            if(currentChat){
                const newCurrentChat = newChats.find(chat => chat.id === currentChat.id);
                if(newCurrentChat){
                    newInCurrent = didLastPageChange(currentChat, newCurrentChat.pages);
                    addPageToChat(currentChat, newCurrentChat.pages);
                }
                const indexOfCurrentChat = newChats.findIndex(chat => chat.id === currentChat.id);
                if(indexOfCurrentChat >= 0){
                    newChats[indexOfCurrentChat] = currentChat;
                }
            }

            this.setState({
                chats: sortChats(newChats),
                currentChat
            }, () => {
                if(!newInCurrent) return;
                scrollToBottom();
            });
        });

        Loaf.on("clearPages", () => {
            this.loadChat(null);
            const { chats } = this.state;

            chats.map(chat => {
                if(chat.pages.length === 0) return chat;
                const maxPage = Math.max(...chat.pages.map(page => page.page));
                const lastPage = chat.pages.find(page => page.page === maxPage);
                if(!lastPage) return chat;
                chat.pages = [lastPage];
                return chat;
            })
            this.setState({ chats: sortChats(chats) });
        })

        Loaf.on("chatPage", (chatPage: { chatId: number, pageEntry: I.IPage }) => {
            const { chats, currentChat } = this.state;
            const targetChat = chats.find(chat => chat.id === chatPage.chatId);

            let newInCurrent = false;

            if(!targetChat) return;

            if(!currentChat || currentChat.id !== targetChat.id){
                targetChat.pages = [chatPage.pageEntry];
            } else {
                newInCurrent = didLastPageChange(currentChat, [chatPage.pageEntry]);
                addPageToChat(currentChat, [chatPage.pageEntry]);
                currentChat.pages.sort((a,b) => a.page-b.page);
            }

            this.setState({
                chats: sortChats(chats),
                currentChat
            }, () => {
                if(!newInCurrent) return;
                scrollToBottom();
            });
        });
        api.chats.get();
    }
    public setContactModal = (state: boolean) => () => {
        this.setState({newContactModal: state});
    }
    public setConversationModal = (state: boolean) => () => {
        this.setState({newConversationModal: state});
    }
    public toggleDrawer = () => {
        this.setState((state) => ({ ...state, drawer: !state.drawer }));
    }
    public render() {
        return (
            <div className="loaf-app">
                <AppBar position="fixed" style={{top:'20px'}} >
                    <Toolbar className="bar">
                        <IconButton className="menuButton" color="inherit" aria-label="Open drawer"  onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap className="logo-wrapper">
                            <img src={logo} alt={'Loaf'} />
                        </Typography>
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.drawer}
                    onOpen={this.toggleDrawer}
                    onClose={this.toggleDrawer}
                    className="sidenav-container"
                    classes={{paper:'drawer-content'}}
                >
                    <DrawerContent
                        newContact={this.setContactModal(true)}
                        newConversation={this.setConversationModal(true)}
                    />
                </SwipeableDrawer>
                <Modal
                    open={this.state.newContactModal}
                    onClose={this.setContactModal(false)}
                    >
                    <NewContact onClose={this.setContactModal(false)} closeDrawer={this.toggleDrawer}/>
                </Modal>
                <Modal
                    open={this.state.newConversationModal}
                    onClose={this.setConversationModal(false)}
                    >
                    <NewConversation
                        onClose={this.setConversationModal(false)}
                        closeDrawer={this.toggleDrawer}
                        chats={this.state.chats}
                    />
                </Modal>
                <div className="playground">
                    <ChatList
                        chats={this.state.chats}
                        currentChat={this.state.currentChat}
                        loadChat={this.loadChat}
                    />
                    <Chat chat={this.state.currentChat}  hash={this.state.hash} />
                </div>
            </div>
        );
    }
    private loadChat = (chat: I.IChatPaged | null) => {
        this.setState({ currentChat: chat }, () => {
            setTimeout(() => {
                const container = document.getElementById("message_container");
                if(!container) return;
                container.scroll({ top: container.scrollHeight });
            }, 10);
        });
    }
}
