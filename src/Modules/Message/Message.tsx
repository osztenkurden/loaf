import React, { Component } from "react";
import { textToRGB} from './../Utils';
import { Avatar } from "@material-ui/core";
import * as I from "./../../../modules/interface";

class FriendMessage extends Component<{message: I.IMessage, sender: { username: string, id: number, avatar: string | null}}>{
    public render(){
        const { message, sender } = this.props;
        return <div className={`message friend ${message.content.type}`}>
            <Avatar className="avatar" style={{ backgroundColor: textToRGB(sender.username) }}>
                {sender.username?.charAt(0).toUpperCase() || `#${sender.id}`}
            
            </Avatar>
            <div className="message-container">
                <div className="message-sender-name">
                    {sender.username}
                </div>
                {message.content.type === "image" ? <div className="">
                    <img src={`data:image/jpeg;base64,${message.content.content}`}/>
                </div>
                :
                <p>{message.content.content}</p>
                }
            </div>
        </div>;
    }
}

export default class Message extends Component<{message: I.IMessage, chatName: string}, any> {
    public render() {
        const { message, chatName } = this.props;
        if(message.content.type === "mixed") return <div className={"message"}>
            <p>Not supported yet</p>
        </div>;
        if(!message.my && message.sender) return <FriendMessage message={message} sender={message.sender}/>
        if(message.content.type === "image"){
            return <div className={"message"}>
                <div><img src={`data:image/jpeg;base64,${message.content.content}`}/></div>
            </div>;
        }
        return <div className={"message"}>
            <p>{message.content.content}</p>
        </div>;
    }
}
