import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Emoji, getLast } from "Modules/Utils";
import moment from "moment";
import React, { Component } from "react";
// import * as API from "./api";
import * as I from "./../../../modules/interface";
import LoafAvatar from "./../../Theme/Components/Avatar";

const getLastTag = (chat: I.IChatPaged, last: I.IMessage | null) => {
    if(!last) return null;
    if(!last.my && chat.private) return '';
    if(last.my){
        return <span className="you">You:</span>;
    }
    return <span className="you">{last.sender?.username || last.senderId}:</span>
}

function getSubText(chat: I.IChatPaged, last: I.IMessage | null) {
    switch (chat.status) {
        case 5:
            return "Waiting for response...";
        case 2:
            if(last?.content.type === "file" || last?.content.type === "mixed") return "sent an image";
            if(last?.content.type === 'text') return last?.content.content || "No messages";
            if(last?.content.type === 'reaction') return Emoji(last?.content.content || '😃');
            if(last?.content.content.type === 'text') return last?.content.content.content || "No messages";
            return "sent an image";
        case 1:
            return <span className="strong">requested your attention</span>;
        default:
            return "";
    }
}

interface IProps {
    chat: I.IChatPaged;
    chatImage: string | null;
    loadChat: (chat: I.IChatPaged) => void;
    isCurrent: boolean;
}

export default class ChatsListEntry extends Component<IProps> {
    public render() {
        const { chat, isCurrent } = this.props;
        const last = getLast(chat);
        return (
            <div className={`chat-list-entry ${isCurrent ? 'current' : ''}`}>
                <ListItem button
                    className={"chat-button " + (chat.unread ? "new-message" : "")}
                    onClick={() => this.props.loadChat(chat)}
                >
                    <LoafAvatar chat={chat} />
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
                                    {getLastTag(chat, last)} {getSubText(chat, last)}
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
