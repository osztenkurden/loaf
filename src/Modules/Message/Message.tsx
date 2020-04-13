import React, { Component } from "react";
import { textToRGB} from './../Utils';
import { Avatar } from "@material-ui/core";
import * as I from "./../../../modules/interface";


function renderGallery(message: I.IMessageContentPackage[]){
    return <div>
        {message.map(payload => {
            if(payload.type === "image"){
                return <img src={`data:image/jpeg;base64,${payload.content}`}/>
            }
            return null;
        })}
    </div>
}

class FriendMessage extends Component<{message: I.IMessage, sender: { username: string, id: number, avatar: Buffer | null}}>{
    renderAvatar = () => {
        const { sender } = this.props;
        const avatar = sender.avatar ? Buffer.from(sender.avatar).toString('base64') : null;
        if(avatar){
            return <Avatar src={`data:image/jpeg;base64,${avatar}`} className="avatar"/>
        }
        return <Avatar className="avatar" style={{ backgroundColor: textToRGB(sender.username) }}>
            {sender.username?.charAt(0).toUpperCase() || `#${sender.id}`}
        </Avatar>
    }
    renderContent = () => {
        const { message } = this.props;
        switch(message.content.type){
            case "text":
                return <p>{message.content.content}</p>
            case "image":
                return <div><img src={`data:image/jpeg;base64,${message.content.content}`}/></div>
            case "mixed":
                return renderGallery(message.content.content);
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

export default class Message extends Component<{message: I.IMessage, chatName: string}, any> {
    renderContent = () => {
        const { message } = this.props;
        switch(message.content.type){
            case "text":
                return <p>{message.content.content}</p>
            case "image":
                return <div><img src={`data:image/jpeg;base64,${message.content.content}`}/></div>
            case "mixed":
                return renderGallery(message.content.content);
        }
    }
    public render() {
        const { message, chatName } = this.props;
        /*if(message.content.type === "mixed") return <div className={"message"}>
            <p>Not supported yet</p>
        </div>;*/
        if(!message.my && message.sender) return <FriendMessage message={message} sender={message.sender}/>
        return <div className="message">
            {this.renderContent()}
        </div>
    }
}
