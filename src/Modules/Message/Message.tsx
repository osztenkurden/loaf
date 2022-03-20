import { questionMark, renderGallery } from "Modules/Utils";
import React, { Component } from "react";
import * as I from "./../../../modules/interface";
import FriendMessage from './FriendMessage'

export default class Message extends Component<{message: I.IMessage, chatName: string}, any> {
    renderContent = () => {
        const { message } = this.props;
        switch(message.content.type){
            case "text":
                return <p>{message.content.content}</p>
            case "file":
                return renderGallery([message.content])
            case "mixed":
                return renderGallery(message.content.content);
        }
    }
    public render() {
        const { message } = this.props;
        /*if(message.content.type === "mixed") return <div className={"message"}>
            <p>Not supported yet</p>
        </div>;*/
        if(!message.my && message.sender) return <FriendMessage message={message} sender={message.sender}/>
        return <div className="message">
            {this.renderContent()}
        </div>
    }
}
