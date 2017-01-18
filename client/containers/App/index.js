import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from 'components/app/Header';
import Sidebar from 'components/app/Sidebar';
import Breadcrumbs from 'components/common/Breadcrumbs';

import theme from 'themes/main';

class App extends Component {
  state = {
    sidebarOpened: Boolean(localStorage.getItem('sidebarOpened')) || true,
  };

  toggleSidebar = () => {
    const { sidebarOpened } = this.state;

    this.setState({
      sidebarOpened: !sidebarOpened,
    });

    localStorage.setItem('sidebarOpened', true);
  };

  render() {
    const {
      children,
      location,
      router,
      routes,
      params,
      route,
    } = this.props;

    const { sidebarOpened } = this.state;

    return (
      <MuiThemeProvider muiTheme={theme()}>
        <div>
          <Header
            toggleSidebar={this.toggleSidebar}
          />
          <Sidebar
            pathname={'anything'}
            changeLocation={route => console.log(`Changing route to ${route}`)}
            logout={() => console.log(`logout`)}
            sidebarOpened={sidebarOpened}
            isAdmin={ false }
          />
          <div style={sidebarOpened ? styles.content : { ...styles.content, ...styles.sidebarClosed }}>
            <Breadcrumbs
              path={
                ['1', '2', '3']
              }
            />
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  content: {
    paddingTop: 90,
    minHeight: 400,
    margin: 34,
    paddingLeft: 300,
    //fontFamily: 'Montserrat',
  },
  sidebarClosed: {
    paddingLeft: 25,
  },
};

export default App;
