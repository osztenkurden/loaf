import { List } from "@material-ui/core";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import ChatsListEntry from "./ChatsListEntry";
// import moment from "moment";
import storage from './../../API/ChatImages';


interface IProps {
    chats: I.IChatPaged[];
    currentChat: I.IChatPaged | null;
    loadChat: (chat: I.IChatPaged) => void;
}


export default class ChatsList extends Component<IProps> {
    public render() {
        const { chats } = this.props;
        return <div className="chat-list">
            <List>
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
