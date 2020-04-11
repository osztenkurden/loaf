import React, { Component } from 'react';
import { Paper, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment } from '@material-ui/core';
import Button from "./../../Theme/Components/LoafButton";
import * as Loaf from "./../../API/Loaf";
import api from "../../API";
import { MoveToInbox, Mail, Group, Settings, GroupAdd, PersonAdd, Cancel, ContactSupport, PermMedia } from '@material-ui/icons';

interface IProps {
    onClose: () => void;
    closeDrawer: () => void;
}

interface IState {
    name: string;
    loading: boolean;
}
export default class NewContact extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            name: '',
            loading: false
        }
    }
    componentDidMount() {
        Loaf.on("userAdded", (data: boolean) => {
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

    addContact = () => {
        this.setState({loading: true}, () => api.user.add(this.state.name));
    }

    render(){
        return(
          <Paper classes={{root:"modal-container"}}>
              <DialogTitle style={{color:'white'}}>Adding contact</DialogTitle>
              <DialogContent>
                  <TextField
                    style={{width:'100%'}}
                    className="text-field-container"
                    value={this.state.name}
                    onChange={this.onChange}
                    placeholder="Username"
                    InputProps={{
                        className:'contact-input',
                        style:{color:'#fff'},
                        startAdornment: <InputAdornment position="start" className="new-contact-adornment">@</InputAdornment>
                    }}
                  />
              </DialogContent>
              <DialogActions>
                  <Button main big onClick={this.addContact}>Add</Button>
                  <Button big onClick={this.props.onClose}>Cancel</Button>
              </DialogActions>
          </Paper>);
    }
}