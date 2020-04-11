import React, { Component } from 'react';
import { ListItemIcon, List, Divider, ListItem, ListItemText } from '@material-ui/core';
import { MoveToInbox, Mail, Group, Settings, GroupAdd, PersonAdd, Cancel, ContactSupport, PermMedia } from '@material-ui/icons';

interface IProps {
    newContact: () => void
}


export default class Drawer extends Component<IProps> {
    render(){
        const menu = [{
            text:"New Conversation",
            icon:GroupAdd
          },{
            text:"Add Contact",
            icon: PersonAdd,
            action: this.props.newContact
          }];
          
          const secondMenu = [{
            text:"Media",
            icon:PermMedia
          },{
            text:"Settings",
            icon:Settings
          },{
            text:"Logout",
            icon:Cancel
          },{
            text:"About LOAF",
            icon: ContactSupport
          }];
        return(<div className='sidenav'>
          <div className='userView'>
            <div className='background'></div>
            <a href='#' className='firstName'><span>Hubert</span></a>
            <a href='#' className='username'><span>@osztenkurden</span></a>
          </div>
          <Divider />
          <List>
            {menu.map((menuEl) => (
              <ListItem button key={menuEl.text} className='menu' onClick={menuEl.action}>
                <ListItemIcon  classes={{root:'menu-icon'}}><menuEl.icon /></ListItemIcon>
                <ListItemText classes={{primary:'menu-entry'}} primary={menuEl.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {secondMenu.map((menuEl) => (
              <ListItem button key={menuEl.text} className='menu'>
                <ListItemIcon classes={{root:'menu-icon'}}><menuEl.icon /></ListItemIcon>
                <ListItemText classes={{primary:'menu-entry'}} primary={menuEl.text} />
              </ListItem>
            ))}
          </List>
          </div>);
    }
}