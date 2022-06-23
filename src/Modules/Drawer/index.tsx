import React, { Component } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Settings from '@material-ui/icons/Settings';
import GroupAdd from '@material-ui/icons/GroupAdd';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Cancel from '@material-ui/icons/Cancel';
import ContactSupport from '@material-ui/icons/ContactSupport';
import PermMedia from '@material-ui/icons/PermMedia';
import api from 'API';
import { UserContext } from 'Context';

interface IProps {
  newContact: () => void,
  newConversation: () => void,
}

type MenuEntry = {
  text: string,
  icon: any,
  action?: () => any | Promise<any>
}


export default class Drawer extends Component<IProps> {
  render() {
    const menu: MenuEntry[] = [{
      text: "New Conversation",
      icon: GroupAdd,
      action: this.props.newConversation
    }, {
      text: "Add Contact",
      icon: PersonAdd,
      action: this.props.newContact
    }];

    const secondMenu: MenuEntry[] = [{
      text: "Media",
      icon: PermMedia
    }, {
      text: "Settings",
      icon: Settings
    }, {
      text: "Logout",
      icon: Cancel,
      action: api.user.logout
    }, {
      text: "About LOAF",
      icon: ContactSupport
    }];
    return (<div className='sidenav'>
      <UserContext.Consumer>
        {user => user ? (
          <div className='userView'>
            <div className='background'></div>
            <span className='firstName'>{user.firstName}</span>
            <span className='username'>@{user.username}</span>
          </div>
        ) : null}
      </UserContext.Consumer>
      <Divider />
      <List>
        {menu.map((menuEl) => (
          <ListItem button key={menuEl.text} className='menu' onClick={menuEl.action}>
            <ListItemIcon classes={{ root: 'menu-icon' }}><menuEl.icon /></ListItemIcon>
            <ListItemText classes={{ primary: 'menu-entry' }} primary={menuEl.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondMenu.map((menuEl) => (
          <ListItem button key={menuEl.text} className='menu' onClick={menuEl.action}>
            <ListItemIcon classes={{ root: 'menu-icon' }}><menuEl.icon /></ListItemIcon>
            <ListItemText classes={{ primary: 'menu-entry' }} primary={menuEl.text} />
          </ListItem>
        ))}
      </List>
    </div>);
  }
}