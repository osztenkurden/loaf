import { renderContent, renderGallery } from "Modules/Utils";
import React from "react";
import * as I from "./../../../modules/interface";
import FriendMessage from './FriendMessage'

type Props = { message: I.IAnyMessage, setAsReply: (message: I.IMessage | null) => void };

const MessageContent = ({ message }:{ message: I.IAnyMessage }) => {
    switch (message.content.type) {
        case "text":
            return <p>{message.content.content}</p>
        case "file":
            return renderGallery([message.content])
        case "mixed":
            return renderGallery(message.content.content);
        default:
            return <p>This message is not supported</p>;
    }
}

const Message = ({ message, setAsReply }: Props) => {
    if(!message.my && message.sender) {
        return <FriendMessage message={message} sender={message.sender} setAsReply={setAsReply} />
    }

    console.log(message);

    return (
        <div className={`message ${message.temporary ? 'sending':''}`}>
            {renderContent(message)}
        </div>
    )
}
export default Message;
