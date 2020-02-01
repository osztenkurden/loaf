import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import api from "./../../API";
import Request from "./Request";

export default class Announcement extends Component<{ request: boolean, chat: I.IChat }> {
    public render() {
        const { chat, request } = this.props;
        if (request) {
            return <Request chat={chat} accept={() => api.chats.accept(chat.id)}/>;
        }
        return <div className={"announcement message"}>
            <p>{
                chat.status === 5 ?
                `${chat.name} still hasn't accepted your request`
                : "No messages"
                }
            </p>
        </div>;
    }
}
