import React, { Component } from 'react';
import { ListItemIcon, List, Divider, ListItem, ListItemText } from '@material-ui/core';
import { Settings, GroupAdd, PersonAdd, Cancel, ContactSupport, PermMedia } from '@material-ui/icons';

interface IProps {
    newContact: () => void,
    newConversation: () => void,
}


export default class Drawer extends Component<IProps> {
    render(){
        const menu = [{
            text:"New Conversation",
            icon:GroupAdd,
            action: this.props.newConversation
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
              <span className='firstName'>Hubert</span>
              <span className='username'>@osztenkurden</span>
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