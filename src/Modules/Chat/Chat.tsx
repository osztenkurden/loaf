
import { AppBar, Avatar, ListItem, ListItemText, TextField, Toolbar } from "@material-ui/core";
import React, { Component } from "react";
// import * as API from './api';
import Announcement from "../Message/Announcement";
import Message from "../Message/Message";
import * as I from "./../../../modules/interface";
import * as Utils from "./../Utils";

interface IProps {
    chat: I.IChat | null;
    manager: any;
    messages: I.IMessage[];
}

interface IState {
    form: {
        textMessage: string;
    };
}

export default class Chat extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            form: {
                textMessage: "",
            },
        };
    }
    public handleKeyDown = (e: any) => {
        if (e.key === "Enter" && this.state.form.textMessage && this.props.chat) {
            this.props.manager.addMessageToStack(this.state.form.textMessage, this.props.chat.id);
            this.props.manager.sendMessage(this.state.form.textMessage, this.props.chat.id);
            this.setState({ form: { textMessage: "" } });
        }
    }
    public handleChange = (e: any) => {
        const { form } = this.state;
        const field: "textMessage" = e.target.name;
        form[field] = e.target.value;
        this.setState({ form });
    }
    public render() {
        if (!this.props.chat) {
            return <div className="chat_container">Choose chat</div>;
        }
        const { chat, messages } = this.props;
        // console.log(this.props.messages)
        return (
            <div className="chat_container">
                <AppBar position="relative" >
                    <Toolbar className="bar">
                        <ListItem>
                            {/*chat.image ?
                            <Avatar src={API.config.apiUrl + 'chats/image?chatId=' + chat.id} className='avatar' /> :
                            <Avatar className="avatar" style={{ backgroundColor: textToRGB(chat.name) }}>
                            {chat.name.charAt(0) && chat.name.charAt(0).toUpperCase() || '#'}</Avatar>*/}
                            <ListItemText inset
                                primary={
                                    <div className={"chat-name"}>
                                        <div className="chat-name-text">{chat.name}</div>
                                    </div>
                                } secondary={

                                    <div className="chat-last-message">
                                        <div className="text">
                                            { chat.last?.my ?
                                                <span className="you">Ty:</span>
                                            : "" } Last seen 10 minutes ago</div>
                                    </div>} />
                        </ListItem>
                    </Toolbar>
                </AppBar>
                <div className={"message_container"}>
                    { chat.status === 1 || !messages.length ?
                    <Announcement
                        request={chat.status === 1}
                        chat={chat}
                        /* manager={this.props.manager}*/
                    /> : ""}
                    {chat.status === 2 ? messages.map((message) => <Message message={message} />) : ""}
                </div>
                {this.props.chat.status === 2 ? <div className="text_sender">
                    <TextField
                        onChange={this.handleChange}
                        name="textMessage"
                        onKeyDown={this.handleKeyDown}
                        id="full-width"
                        placeholder="Placeholder"
                        fullWidth
                        value={this.state.form.textMessage}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div> : ""}
            </div>
        );
    }
}

/*

          <div onClick={() => {
            if(this.props.chat) this.props.manager.sendMessage("Dupa", this.props.chat.id)
          }}>SEND MESSAGE</div>

            {this.state.chats.map((chat: any) => <div>CHAT:{chat.name}, STAT
            S: {chat.status} {chat.status ===1 ? <div onClick={() => this.acce
                ptInvitation(chat.id)}>ACCEPT INVITATION</div> : ''}</div>)}
            <div onClick={() => this.requestFriend(2)}>Add Friend</div>
            <div onClick={() => this.loadMessages(1)}>Get messages</div>*/
