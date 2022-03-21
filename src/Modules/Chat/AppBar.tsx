import React from 'react';
import { AppBar, Toolbar, ListItem } from '@material-ui/core';
import * as I from "./../../../modules/interface";
import { ListItemText } from '@material-ui/core';
import api from "./../../API";
import LoafAvatar from 'Theme/Components/Avatar';
import { UserContext } from 'Context';

interface IProps {
    chat: I.IChatPaged;
}


export const LoafAppBar = (props: IProps) => {
    const { chat } = props;
    const handleFiles = (files: FileList | null) => {
        if (chat.private) return;
        if (!files || !files.length) return;

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            if (typeof reader.result !== "string") {
                return;
            }
            api.chats.updateChatInfo(chat.id, chat.name, reader.result);
        }
    }


    return <AppBar position="relative" >
        <Toolbar className="bar">
            <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>

                <UserContext.Consumer>
                    {user => (
                        <>
                            <label htmlFor="chat_image_upload_button">
                                <LoafAvatar chat={chat} editable={!!user && user.id === chat.creatorId} />
                            </label>
                            { !!user && user.id === chat.creatorId && <input id="chat_image_upload_button" type="file" accept='image/*' style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />}
                        </>
                    )}
                </UserContext.Consumer>
                <ListItemText inset
                    className="chat-text-item"
                    primary={
                        <div className={"chat-name"}>
                            <div className="chat-name-text">{chat.name}</div>
                        </div>
                    } secondary={

                        <div className="chat-last-message">
                            <div className="text">
                                {chat.last?.my ?
                                    <span className="you">Ty:</span>
                                    : ""} Last seen 10 minutes ago</div>
                        </div>} />
            </ListItem>
        </Toolbar>
    </AppBar>
}
/*export default class LoafAppBar extends React.Component<IProps> {
    public handleFiles = (files: FileList | null) => {
        const { chat } = this.props;
        if (chat.private) return;
        if (!files || !files.length) return;

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            if (typeof reader.result !== "string") {
                return;
            }
            api.chats.updateChatInfo(chat.id, chat.name, reader.result);
        }
    }
    public render() {
        const { chat } = this.props;
        return <AppBar position="relative" >
            <Toolbar className="bar">
                <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>

                    <label htmlFor="chat_image_upload_button">
                        {chat.image ?
                            <Avatar src={storage.get(chat.id) as string} className='avatar' /> :
                            <Avatar className="avatar" style={{ backgroundColor: textToRGB(chat.name) }}>
                                {chat.name.charAt(0)?.toUpperCase() || '#'}
                            </Avatar>
                        }
                    </label>
                    <input id="chat_image_upload_button" type="file" accept='image/*' style={{ display: 'none' }} onChange={e => this.handleFiles(e.target.files)}/>
                    <ListItemText inset
                        className="chat-text-item"
                        primary={
                            <div className={"chat-name"}>
                                <div className="chat-name-text">{chat.name}</div>
                            </div>
                        } secondary={

                            <div className="chat-last-message">
                                <div className="text">
                                    {chat.last?.my ?
                                        <span className="you">Ty:</span>
                                        : ""} Last seen 10 minutes ago</div>
                            </div>} />
                </ListItem>
            </Toolbar>
        </AppBar>
    }
}*/

export default LoafAppBar;