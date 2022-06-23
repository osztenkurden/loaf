import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from "./../../Theme/Components/LoafButton";
import * as Loaf from "./../../API/Loaf";
import api from "../../API";
import * as I from "./../../../modules/interface";
import LoafAvatar from "./../../Theme/Components/Avatar";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

interface IProps {
    onClose: () => void;
    closeDrawer: () => void;
    chats: I.IChatPaged[];
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