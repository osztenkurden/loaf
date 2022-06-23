import { Emoji, renderContent, renderGallery, textToRGB } from "Modules/Utils";
import React from "react";
import api, { events } from "./../../API";
import Avatar from "@material-ui/core/Avatar";
import * as I from "./../../../modules/interface";

type Props = { isLast: boolean, isFirst: boolean, message: I.IAnyMessage, setAsReply: (message: I.IMessage | null) => void, addReaction: (emoji: string) => void };

const isMSG = (msg: I.IAnyMessage): msg is I.IMessage => {
    return "uuid" in msg.content;
} 
const Message = ({ message, setAsReply, addReaction, isLast, isFirst }: Props) => {
    if(message.content.type === 'reaction') return null;
    const setReply = () => {
        if(isMSG(message)){
            setAsReply(message);
        }
    }
    if (!message.my && message.sender) {

        return (
            <div className={`message friend ${isLast ? 'last':''} ${isFirst ? 'first': ''} ${message.content.type}`}>
                <Avatar className="avatar" style={{ backgroundColor: textToRGB(message.sender.username) }}>
                    {message.sender.username?.charAt(0).toUpperCase() || `#${message.sender.id}`}
                </Avatar>
                <div className="message-container">
                    <div className="message-sender-name">
                        {message.sender.username}
                        {"uuid" in message.content && message.content.uuid ? <div className="message-reply" onClick={setReply}>
                            Reply
                        </div> : null}
                    </div>
                    {renderContent(message.content, true)}
                    {"reactions" in message && message.reactions.length ? <span>{message.reactions.map(reaction => Emoji(reaction.content.content as string))}</span>: null}
                    {"replies" in message && message.replies.length ? <p>Reply amount: {message.replies.length}</p>: null}
                </div>
            </div>
        )
    }

    return (
        <div className={`message  ${isLast ? 'last':''} ${isFirst ? 'first': ''} ${message.temporary ? 'sending' : ''}`} onClick={() => console.log(message)}>
            {/* "uuid" in message.content && message.content.uuid ? <div className="message-reply" onClick={setReply}>
            Reply
    </div> : null */}
            <div className="message-container">
            {renderContent(message.content)}
            {"reactions" in message && message.reactions.length ? <span>{message.reactions.map(reaction => Emoji(reaction.content.content as string))}</span>: null}
            {"replies" in message && message.replies.length ? <p>Reply amount: {message.replies.length}</p>: null}
            </div>
        </div>
    )
}
export default Message;
