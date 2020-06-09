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

interface IState {
    drawer: boolean;
    chats: I.IChat[];
    currentChat: I.IChat | null;
    newContactModal: boolean;
    newConversationModal: boolean;
    storage: ChatImageStorage;
    hash: string
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
            hash: ''
        };
    }
    public async componentDidMount() {
        Loaf.on("chats", (chats: I.IChat[]) => {
            this.setState({ chats }, () => {
                if(!this.state.currentChat) return;
                for(const chat of chats){
                    if(chat.id === this.state.currentChat.id){
                        this.setState({currentChat: chat})
                    }
                }
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
                    <DrawerContent newContact={this.setContactModal(true)}/>
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
                        newConversation={this.setConversationModal(true)}
                    />
                    <Chat chat={this.state.currentChat}  hash={this.state.hash} />
                </div>
            </div>
        );
    }
    private loadChat = (chat: I.IChat) => {
        this.setState({ currentChat: chat });
    }
}
