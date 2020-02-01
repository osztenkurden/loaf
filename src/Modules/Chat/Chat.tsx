
import { AppBar, Avatar, ListItem, ListItemText, TextField, Toolbar } from "@material-ui/core";
import React, { Component } from "react";
// import * as API from './api';
import Announcement from "../Message/Announcement";
import Message from "../Message/Message";
import * as I from "./../../../modules/interface";

interface IProps {
    chat: I.IChat | null;
}

interface IState {
    form: {
        textMessage: string;
    };
}

export default class Chat extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: {
                textMessage: "",
            },
        };
    }
    public render() {
        if (!this.props.chat) {
            return <div className="chat_container">Choose chat</div>;
        }
        const { chat } = this.props;
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
                    { chat.status === 1 || !chat.messages.length ?
                    <Announcement
                        request={chat.status === 1}
                        chat={chat}
                        /* manager={this.props.manager}*/
                    /> : ""}
                    {chat.status === 2 ? chat.messages.map((message) => <Message message={message} />) : ""}
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
    private handleKeyDown = (e: any) => {
        if (e.key === "Enter" && this.state.form.textMessage && this.props.chat) {
            // TODO: SEND MESSAGE
            this.setState({ form: { textMessage: "" } });
        }
    }
    private handleChange = (e: any) => {
        const { form } = this.state;
        const field: "textMessage" = e.target.name;
        form[field] = e.target.value;
        this.setState({ form });
    }
}
