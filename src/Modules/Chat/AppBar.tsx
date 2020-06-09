import React from 'react';
import { AppBar, Toolbar, ListItem, Avatar } from '@material-ui/core';
import { textToRGB } from 'Modules/Utils';
import * as I from "./../../../modules/interface";
import { ListItemText } from '@material-ui/core';
import storage from "./../../API/ChatImages";

interface IProps {
    chat: I.IChat;
}

export default class LoafAppBar extends React.Component<IProps> {
    public render(){
        const { chat } = this.props;
        return <AppBar position="relative" >
            <Toolbar className="bar">
                <ListItem style={{paddingTop:0,paddingBottom:0}}>
                    {chat.image ?
                    <Avatar src={`data:image/jpeg;base64,${storage.get(chat.id)}`} className='avatar' /> :
                    <Avatar className="avatar" style={{ backgroundColor: textToRGB(chat.name) }}>
                    {chat.name.charAt(0)?.toUpperCase() || '#'}</Avatar>}
                    <ListItemText inset
                        className="chat-text-item"
                        primary={
                            <div className={"chat-name"}>
                                <div className="chat-name-text">{chat.name}</div>
                            </div>
                        } secondary={

                            <div className="chat-last-message">
                                <div className="text">
                                    { chat.last?.my ?
                                        <span className="you">Ty:</span>
                                    : "" } Last seen 10 minutes ago</div>
                            </div>} />
                </ListItem>
            </Toolbar>
        </AppBar>
    }
}