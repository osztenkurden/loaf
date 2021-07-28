import { Divider, ListItem, ListItemText } from "@material-ui/core";
import moment from "moment";
import React, { Component } from "react";
// import * as API from "./api";
import * as I from "./../../../modules/interface";
import LoafAvatar from "./../../Theme/Components/Avatar";

function getSubText(chat: I.IChatPaged, last: I.IMessage | null) {
    switch (chat.status) {
        case 5:
            return "Waiting for response...";
        case 2:
            if(last?.content.type === "file" || last?.content.type === "mixed") return "sent an image";
            return last?.content.content || "No messages";
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
    getMessagesFromLastPage = () => {
        const { chat } = this.props;
        if(!chat) return [];
        if(chat.last) return [chat.last];
        const maxPage = Math.max(...chat.pages.map(page => page.page));
        const lastPage = chat.pages.find(page => page.page === maxPage);
        if(!lastPage) return [];
        return lastPage.messages;
    }
    getLast = () => {
        const messages = this.getMessagesFromLastPage();
        let last: I.IMessage | null = null;

        for(const message of messages){
            if(!last){
                last = message;
                continue;
            }
            if(new Date(message.date) > new Date(last.date)){
                last = message;
            }
        }
        return last;
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
