import { Avatar, Divider, IconButton, ListItem, ListItemText } from "@material-ui/core";
import moment from "moment";
import React, { Component } from "react";
// import * as API from "./api";
import { textToRGB} from './../Utils';
import * as I from "./../../../modules/interface";

function getSubText(chat: I.IChat, last: I.IMessage | null) {
    switch (chat.status) {
        case 5:
            return "Waiting for response...";
        case 2:
            return last && last.content.content || "No messages";
        case 1:
            return <span className="strong">requested your attention</span>;
        default:
            return "";
    }
}

export default class ChatsListEntry extends Component<{ chat: I.IChat, loadChat: (chat: I.IChat) => void }, any> {
    getLast = () => {
        const { chat } = this.props;
        if(!chat) return null;
        if(chat.last) return chat.last;
        if(!chat.messages.length) return null;
        return chat.messages[chat.messages.length-1];
    }
    public render() {
        const { chat } = this.props;
        const last = this.getLast();
        return (
            <div>
                <ListItem button
                    className={"chat-button " + (chat.unread ? "new-message" : "")}
                    onClick={() => this.props.loadChat(chat)}
                >
                    {chat.image ?
                    <Avatar src={"http://localhost:5000/chats/image?chatId=" + chat.id} className="avatar"/> :
                    <Avatar className="avatar" style={{backgroundColor: textToRGB(chat.name)}}>
                    {chat.name.charAt(0) && chat.name.charAt(0).toUpperCase() || "#"}
                    </Avatar>}
                    <ListItemText inset
                        className="text-item"
                        primary={
                            <div className={"chat-name"}>
                                <div className="chat-name-text">{chat.name}</div>
                                <div className="last-message-date">
                                    {last ? moment(last.date).fromNow() : ""}
                                </div>
                            </div>
                        }
                        secondary={
                            <div className="chat-last-message">
                                <div className="text">
                                    {last?.my ? <span className="you">You:</span> : ""} {getSubText(chat, last)}
                                </div>
                                <div className={"last-text-status " /*+ (chat.lastYours ? chat.status : '')*/}></div>
                            </div>
                        }
                    />
                </ListItem>
                <li>
                    <Divider variant="inset" className="separator" />
                </li>
            </div>);
    }
}
