import React, { Component } from 'react';
import { Paper, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Button from "./../../Theme/Components/LoafButton";
import * as Loaf from "./../../API/Loaf";
import api from "../../API";
import * as I from "./../../../modules/interface";
import LoafAvatar from "./../../Theme/Components/Avatar";
import { Remove as RemoveIcon, Add as AddIcon } from '@material-ui/icons';

interface IProps {
    onClose: () => void;
    closeDrawer: () => void;
    chats: I.IChat[];
}

interface IState {
    name: string;
    loading: boolean;
    selectedChats: number[];
}
export default class NewConversation extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            name: '',
            loading: false,
            selectedChats: [],
        }
    }
    componentDidMount() {
        Loaf.on("createdChat", (data: boolean) => {
            this.setState({loading: false}, () => {
                if(!data) return;
                this.props.onClose();
                this.props.closeDrawer();
            })
        })
    }

    onChange = (ev: any) => {
        this.setState({name: ev.target.value});
    }

    toggleChatEntry = (chatId: number) => () => {
        let selectedChats = this.state.selectedChats;
        if(selectedChats.includes(chatId)){
            selectedChats = selectedChats.filter(id => id !== chatId);
        } else {
            selectedChats.push(chatId);
        }
        this.setState({selectedChats})
    }

    createConversation = () => {
        const { name, selectedChats } = this.state;
        const userIds: number[] = [];
        const chats = this.props.chats.filter(chat => selectedChats.includes(chat.id)).map(chat => chat.users).flat().map(user => user.id);
        for(const userId of chats){
            if(!userId) continue;
            if(!userIds.includes(userId)) userIds.push(userId);
        }
        if(!this.state.loading) this.setState({loading: true}, () => api.chats.createGroup(name, userIds));
    }

    render(){
        const { chats } = this.props;
        const { selectedChats } = this.state;
        return(
          <Paper classes={{root:"modal-container new-conversation"}}>
              <DialogTitle style={{color:'white'}}>Create group</DialogTitle>
              <DialogContent>
                  <TextField
                    style={{width:'100%'}}
                    className="text-field-container"
                    value={this.state.name}
                    onChange={this.onChange}
                    disabled={this.state.loading}
                    placeholder="Group name"
                    InputProps={{
                        className:'contact-input',
                        style:{color:'#fff'},
                    }}
                />
                <List dense={true}>
                    {chats.filter(chat => chat.private).map(chat => <ListItem className={`new-conversation-entry ${selectedChats.includes(chat.id) ? 'selected':''}`}>
                        <ListItemAvatar>
                            <Avatar>
                                <LoafAvatar chat={chat}  />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<div className="visible-name">{chat.name}</div>}
                            secondary={<div className="main-identifier">{`@${chat.name}`}</div>}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                {selectedChats.includes(chat.id) ? <RemoveIcon  onClick={this.toggleChatEntry(chat.id)}/> : <AddIcon  onClick={this.toggleChatEntry(chat.id)}/>}
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>)}
                    </List>
              </DialogContent>
              <DialogActions>
                  <Button main big onClick={this.createConversation}>Add</Button>
                  <Button big onClick={this.props.onClose}>Cancel</Button>
              </DialogActions>
          </Paper>);
    }
}