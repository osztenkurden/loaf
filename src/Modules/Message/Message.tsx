import { questionMark, renderGallery } from "Modules/Utils";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import FriendMessage from './FriendMessage'

type Props = { message: I.IAnyMessage };

const MessageContent = ({ message }:{ message: I.IAnyMessage }) => {
    switch (message.content.type) {
        case "text":
            return <p>{message.content.content}</p>
        case "file":
            return renderGallery([message.content])
        case "mixed":
            return renderGallery(message.content.content);
    }
}

const Message = ({ message }: Props) => {
    if(!message.my && message.sender) {
        return <FriendMessage message={message} sender={message.sender} />
    }

    return (
        <div className={`message ${message.temporary ? 'sending':''}`}>
            <MessageContent message={message} />
        </div>
    )
}
export default Message;
