import { Button, ExtendButtonBase, ButtonTypeMap, Avatar } from "@material-ui/core";
import React, { Component, ReactElement } from "react";
import * as I from "./../../../modules/interface";
import { textToRGB } from './../../Modules/Utils';
import ChatImageStorage from "./../../API/ChatImages";

interface IProps  {
    chat: I.IChat;
    storage: ChatImageStorage;
}

export default class LoafAvatar extends Component<IProps> {
    public render() {
        const { chat } = this.props;
        if(chat.image){
            return <Avatar src={`data:image/jpeg;base64,${this.props.storage.get(chat.id)}`} className="avatar"/>
        }
        return <Avatar className="avatar" style={{backgroundColor: textToRGB(chat.name)}}>
            {chat.name.charAt(0) && chat.name.charAt(0).toUpperCase() || "#"}
        </Avatar>
    }
}
