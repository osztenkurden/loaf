import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from "./../../Theme/Components/LoafButton";
import * as Loaf from "./../../API/Loaf";
import api from "../../API";

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
        if(!this.state.loading) this.setState({loading: true}, () => api.user.add(this.state.name));
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
                    disabled={this.state.loading}
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