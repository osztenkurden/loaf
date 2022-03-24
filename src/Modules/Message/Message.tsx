import { renderContent, renderGallery } from "Modules/Utils";
import React from "react";
import * as I from "./../../../modules/interface";
import FriendMessage from './FriendMessage'

type Props = { message: I.IAnyMessage, setAsReply: (message: I.IMessage | null) => void };

const Message = ({ message, setAsReply }: Props) => {
    if(!message.my && message.sender) {
        return <FriendMessage message={message} sender={message.sender} setAsReply={setAsReply} />
    }

    return (
        <div className={`message ${message.temporary ? 'sending':''}`}>
            {renderContent(message.content)}
        </div>
    )
}
export default Message;
