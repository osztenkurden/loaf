import { List, ListItem, Avatar, ListItemText, Divider } from "@material-ui/core";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import ChatsListEntry from "./ChatsListEntry";
import api from "./../../API";
import { textToRGB } from "Modules/Utils";
import moment from "moment";
import storage from './../../API/ChatImages';


interface IProps {
    chats: I.IChat[];
    currentChat: I.IChat | null;
    loadChat: (chat: I.IChat) => void;
    newConversation: () => void;
}


export default class ChatsList extends Component<IProps> {
    public render() {
        const { chats, newConversation } = this.props;
        return <div className="chat-list">
            <List>
            <div className={`chat-list-entry current new-convo`}>
                <ListItem button
                    className={"chat-button"}
                    onClick={newConversation}
                >
                    <Avatar className="avatar">+</Avatar>
                    <ListItemText inset
                        className="text-item"
                        primary={
                            <div className={"chat-name"}>
                                <div className="chat-name-text">conversation</div>
                                {/*<div className="last-message-date">
                                    {last ? moment(last.date).fromNow() : ""}
                            </div>*/}
                            </div>
                        }
                    />
                </ListItem>
                <li>
                    <Divider variant="inset" className="separator" />
                </li>
            </div>
                {chats.map((chat) => <ChatsListEntry
                    key={chat.id}
                    chat={chat}
                    chatImage={storage.get(chat.id)}
                    loadChat={this.props.loadChat}
                    isCurrent={this.props.currentChat?.id === chat.id}
                />)}
            </List>
        </div>;
    }
}
