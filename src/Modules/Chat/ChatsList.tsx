import { List } from "@material-ui/core";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import ChatsListEntry from "./ChatsListEntry";

interface IProps {
    chats: I.IChat[];
}

export default class ChatsList extends Component<IProps> {
    public render() {
        const { chats } = this.props;
        return <div className="chat-list">
            <List>
                { chats.map((chat) => <ChatsListEntry chat={chat} loadChat={() => {/**/}} />)}
            </List>
        </div>;
    }
}
