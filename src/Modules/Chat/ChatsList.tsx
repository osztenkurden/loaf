import { List } from "@material-ui/core";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import ChatsListEntry from "./ChatsListEntry";
import api from "./../../API";
import ChatImageStorage from "API/ChatImages";

interface IProps {
    chats: I.IChat[];
    storage: ChatImageStorage;
    currentChat: I.IChat | null;
    loadChat: (chat: I.IChat) => void;
}


export default class ChatsList extends Component<IProps> {
    public requestTestFriend = async () => {
        api.chats.createTest();
    }
    public render() {
        const { chats } = this.props;
        return <div className="chat-list">
            <List>
                {chats.map((chat) => <ChatsListEntry
                    key={chat.id}
                    chat={chat}
                    chatImage={this.props.storage.get(chat.id)}
                    loadChat={this.props.loadChat}
                    isCurrent={this.props.currentChat?.id === chat.id}
                />)}
            </List>
            <div onClick={this.requestTestFriend}>Add Test Group</div>
            <div /*onClick={/*() => this.loadMessages(1)}*/>Get messages</div>
        </div>;
    }
}
