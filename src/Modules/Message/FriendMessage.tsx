import React, { Component } from "react";
import { textToRGB, renderGallery, questionMark } from './../Utils';
import { Avatar } from "@material-ui/core";
import * as I from "./../../../modules/interface";

export default class FriendMessage extends Component<{message: I.IMessage, sender: { username: string, id: number}}>{
    renderAvatar = () => {
        const { sender } = this.props;
        
        
        //TODO: Avatar as URL and fallback
        
        return <Avatar src={``} className="avatar"/>
        
        /*return <Avatar className="avatar" style={{ backgroundColor: textToRGB(sender.username) }}>
            {sender.username?.charAt(0).toUpperCase() || `#${sender.id}`}
        </Avatar>*/
    }
    renderContent = () => {
        const { message } = this.props;
        switch(message.content.type){
            case "text":
                return <p>{message.content.content}</p>
            case "file":
                return renderGallery([message.content], true);
            case "mixed":
                return renderGallery(message.content.content, true);
        }
    }
    public render(){
        const { message, sender } = this.props;
        return <div className={`message friend ${message.content.type}`}>
            {this.renderAvatar()}
            <div className="message-container">
                <div className="message-sender-name">
                    {sender.username}
                </div>
                {this.renderContent()}
            </div>
        </div>;
    }
}