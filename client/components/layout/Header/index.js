import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link, withRouter } from 'react-router';

import colors from 'themes/colors';

import AppBar from 'material-ui/AppBar';

import Dashboard from './Dashboard';
import { Toolbar } from 'components/layout/Toolbar';

class Header extends Component {
  render() {
    const { toggleSidebar } = this.props;

    return (
      <AppBar
        title={<Dashboard toggleSidebar={toggleSidebar} isAdmin={ this.props.viewer.isAdmin } />}
        titleStyle={styles.title}
        showMenuIconButton={false}
        style={styles.appBar}
        zDepth={2}
        iconElementRight={ <Toolbar /> }
      />
    );
  }
}

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    backgroundColor: 'white',
    zIndex: 1400,
    height: 90,
    boxShadow: 'rgba(0, 0, 0, 0.001) 0px 5px 10px, rgba(0, 0, 0, 0.1) 0px 8px 20px',
  },
  title: {
    color: colors.title,
    fontFamily: 'Montserrat',
    fontWeigth: 'bold',
    lineHeight: 'none',
  },
};

export default Relay.createContainer(withRouter(Header), {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        isAdmin
      }
    `
  }
});
