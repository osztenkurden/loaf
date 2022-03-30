import React from "react";
import { textToRGB, renderContent } from './../Utils';
import { Avatar } from "@material-ui/core";
import * as I from "./../../../modules/interface";

type Props = { message: I.IAnyMessage, sender: { username: string, id: number }, setAsReply: (message: I.IMessage | null) => void };

const isMSG = (msg: I.IAnyMessage): msg is I.IMessage => {
    return "uuid" in msg.content;
} 

const FriendMessage = ({ message, sender, setAsReply }: Props) => {
    const setReply = () => {
        if(isMSG(message)){
            setAsReply(message);
        }
    }
    return (
        <div className={`message friend ${message.content.type}`}>
            <Avatar className="avatar" style={{ backgroundColor: textToRGB(sender.username) }}>
                {sender.username?.charAt(0).toUpperCase() || `#${sender.id}`}
            </Avatar>
            <div className="message-container">
                <div className="message-sender-name">
                    {sender.username}
                    { "uuid" in message.content && message.content.uuid ? <div className="message-reply" onClick={setReply}>
                        Reply
                    </div> : null }
                </div>
                {renderContent(message.content, true)}
            </div>
        </div>
    )
}
export default FriendMessage;