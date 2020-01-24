import { Avatar, Divider, IconButton, ListItem, ListItemText } from "@material-ui/core";
import { CheckCircleRounded } from "@material-ui/icons";
import moment from "moment";
import React, { Component } from "react";
// import * as API from "./api";
import * as I from "./../../../modules/interface";
function hashCode(str: string) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       // tslint:disable-next-line:no-bitwise
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function textToRGB(i: string) {
    // tslint:disable-next-line:no-bitwise
    const c = (hashCode(i) & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}

function getSubText(chat: I.IChat) {
    switch (chat.status) {
        case 5:
            return "Waiting for response...";
        case 2:
            return chat.last && chat.last.content || "No messages";
        case 1:
            return <span className="strong">requested your attention</span>;
        default:
            return "";
    }
}

export default class ChatsListEntry extends Component<{ chat: I.IChat, loadChat: any }, any> {
    public render() {
        const { chat } = this.props;
        return (
            <div>
                <ListItem button
                    className={"chat-button " + (chat.unread ? "new-message" : "")}
                    onClick={() => this.props.loadChat(chat.id)}
                >
                    {/*chat.image ?
                    <Avatar src={API.config.apiUrl + "chats/image?chatId=" + chat.id} className="avatar"/> :
                    <Avatar className="avatar" style={{backgroundColor: textToRGB(chat.name)}}>
                    {chat.name.charAt(0) && chat.name.charAt(0).toUpperCase() || "#"}
                    </Avatar>*/}
                    <ListItemText inset
                        primary={
                            <div className={"chat-name"}>
                                <div className="chat-name-text">{chat.name}</div>
                                <div className="last-message-date">
                                    {chat.last ? moment(chat.last.date).fromNow() : ""}
                                </div>
                            </div>
                        }
                        secondary={
                            <div className="chat-last-message">
                                <div className="text">
                                    {chat.last?.my ? <span className="you">You:</span> : ""} {getSubText(chat)}
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
