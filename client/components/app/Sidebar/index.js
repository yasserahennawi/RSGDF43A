import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { List, ListItem, makeSelectable } from 'material-ui/List'
import { style } from 'glamor';

import colors from 'themes/colors';
import Icon from 'components/common/Icon';
import ICONS from 'components/common/Icons';

import Drawer from 'material-ui/Drawer';
import { spacing } from 'material-ui/styles';

import Profile from 'components/app/SidebarProfile';

const SelectableList = makeSelectable(List);

const renderAdminMenus = ( props, handler ) => (
  <SelectableList value={props.pathname} onChange={ handler }>
    <ListItem
      primaryText="FREIGABE"
      value="/release"
      leftIcon={
        <Icon icon={ICONS.LIST} color="#fff"/>
      }
      style={styles.listItem}
    />

    <ListItem
      primaryText="MITGLIEDER"
      value="/members"
      leftIcon={
        <Icon icon={ICONS.USER} color="#fff"/>
      }
      style={styles.listItem}
    />

    <ListItem
      primaryText="STORE-VERWALTUNG"
      value="/store"
      leftIcon={
          <Icon icon={ICONS.CLICK} color="#fff" noTransform />
      }
      style={styles.listItem}
    />

  </SelectableList>
)
const renderUserMenus = ( props, handler ) => (
  <SelectableList value={props.pathname} onChange={ handler }>

    <ListItem
      primaryText="MEINE SPECIALS"
      value="/specials"
      leftIcon={
        <Icon icon={ICONS.LIST} color="#fff" />
      }
      style={styles.listItem}
    />

    <ListItem
      primaryText="NEUES SPECIAL"
      value="/books"
      leftIcon={
        <Icon icon={ICONS.CIRCLEPLUS} color="#fff"/>
      }
      style={styles.listItem}
    />

    <ListItem
      primaryText="KONTOVERWALTUNG"
      value="/"
      leftIcon={
        <Icon icon={ICONS.GEAR} color="#fff"/>
      }
      style={styles.listItem}
    />
  </SelectableList>
)

export class Sidebar extends Component {
  handleRequestChangeLink = (event, value) => {
    this.props.changeLocation(value);
  };

  render() {
    const { logout, sidebarOpened } = this.props;

    return (
      <Drawer
        docked={sidebarOpened}
        containerStyle={styles.container}
        zDepth={0}
      >
        <Profile />

        { this.props.isAdmin ?
          renderAdminMenus( this.props, this.handleRequestChangeLink ) :
          renderUserMenus( this.props, this.handleRequestChangeLink )
        }

        {/* admin */}

        <ListItem
          primaryText="LOGOUT"
          onClick={logout}
          value=""
          leftIcon={
              <Icon icon={ICONS.SHUTDOWN} color="#4C8C7E" />
          }
          style={{ ...styles.listItem, ...styles.logout }}
        />
      </Drawer>
    );
  }
}

const styles = {
  container: {
    top: 90, // Because of header
    backgroundColor: '#0092ee',
    background: colors.gradient,
    width: 300,
  },
  listItem: {
    color: 'white',
    fontFamily: 'Montserrat',
    borderLeft: '2px red blue',
  },
  fontIcon: {
    color: 'white',
  },
  logout: {
    position: 'absolute',
    bottom: 90,
    color: '#4C8C7E',
    backgroundColor: '#82E9D3',
    width: '100%',
  },
};

export default withRouter(Sidebar);
