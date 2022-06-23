import Avatar from "@material-ui/core/Avatar";
import React from "react";
import * as I from "./../../../modules/interface";
import { textToRGB } from './../../Modules/Utils';
import storage from "./../../API/ChatImages";
import AddAPhoto from "@material-ui/icons/AddAPhoto";

interface IProps {
    chat: I.IChatPaged;
    editable?: boolean
}

const LoafAvatar = ({ chat, editable }: IProps) => {
    let avatar = <Avatar className="avatar" style={{ backgroundColor: textToRGB(chat.name) }}>
        {chat.name.charAt(0)?.toUpperCase() || "#"}
    </Avatar>;
    if (chat.image) {
        avatar = <Avatar src={'file://' + storage.get(chat.id) as string} className="avatar" />
    }
    return <div className={`avatar-container ${editable ? 'editable':''}`}>
        {avatar}
        {editable ? <div className="editable-hover"><AddAPhoto /></div> : null}
    </div>
}

export default LoafAvatar;
