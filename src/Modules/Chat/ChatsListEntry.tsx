import { Avatar, Divider, IconButton, ListItem, ListItemText } from "@material-ui/core";
import moment from "moment";
import React, { Component } from "react";
// import * as API from "./api";
import { textToRGB} from './../Utils';
import * as I from "./../../../modules/interface";
import { Chat } from "@material-ui/icons";
import LoafAvatar from "./../../Theme/Components/Avatar";

function getSubText(chat: I.IChat, last: I.IMessage | null) {
    switch (chat.status) {
        case 5:
            return "Waiting for response...";
        case 2:
            if(last?.content.type === "image" || last?.content.type === "mixed") return "sent an image";
            return last && last.content.content || "No messages";
        case 1:
            return <span className="strong">requested your attention</span>;
        default:
            return "";
    }
}

interface IProps {
    chat: I.IChat;
    chatImage: string | null;
    loadChat: (chat: I.IChat) => void;
    isCurrent: boolean;
}

export default class ChatsListEntry extends Component<IProps> {
    getLast = () => {
        const { chat } = this.props;
        if(!chat) return null;
        if(chat.last) return chat.last;
        if(!chat.messages.length) return null;
        return chat.messages[chat.messages.length-1];
    }

    getLastTag = () => {
        const { chat } = this.props;
        const last = this.getLast();
        if(!last) return null;
        if(!last.my && chat.private) return '';
        if(last.my){
            return <span className="you">You:</span>;
        }
        return <span className="you">{last.sender?.username || last.senderId}:</span>
    }

    public render() {
        const { chat, isCurrent } = this.props;
        const last = this.getLast();
        return (
            <div className={`chat-list-entry ${isCurrent && 'current' || ''}`}>
                <ListItem button
                    className={"chat-button " + (chat.unread ? "new-message" : "")}
                    onClick={() => this.props.loadChat(chat)}
                >
                    <LoafAvatar chat={chat} />
                    {/*chat.image ?
                    <Avatar src={`data:image/jpeg;base64,${this.props.chatImage}`} className="avatar"/> :
                    <Avatar className="avatar" style={{backgroundColor: textToRGB(chat.name)}}>
                    {chat.name.charAt(0) && chat.name.charAt(0).toUpperCase() || "#"}
                    </Avatar>*/}
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
                                    {this.getLastTag()} {getSubText(chat, last)}
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
