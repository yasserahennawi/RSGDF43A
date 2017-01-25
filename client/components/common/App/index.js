import React from 'react';
import Relay from 'react-relay';
import Loading from 'components/common/Loading';
import Login from 'components/auth/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from 'components/layout/Header';
import Sidebar from 'components/layout/Sidebar';
import Breadcrumbs from 'components/utils/Breadcrumbs';
import theme from 'themes/main';
import {
  setInStorage,
  getFromStorage,
} from 'helpers/storage';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

import localeData from 'locales/data.json';

addLocaleData([...en, ...de]);

class App extends React.Component {

  componentWillMount() {
    console.log(getFromStorage('sidebarOpened'));
    this.setState({
      loadingProgress: 0,
      sidebarOpened: Boolean(getFromStorage('sidebarOpened')) || true,
    });

    // wait for 100 * (50 / 5) = 1000 millis
    const interval = setInterval(() => {
      if(this.state.loadingProgress > 100) {
        clearInterval(interval);
      } else {
        this.setState({ loadingProgress: this.state.loadingProgress + 16 });
      }
    }, 300);
  }

  toggleSidebar = () => {
    const { sidebarOpened } = this.state;

    this.setState({
      sidebarOpened: !sidebarOpened,
    });

    setInStorage('sidebarOpened', true);
  };

  render() {
    const {
      viewer
    } = this.props;

    let children;
    if(!viewer || (viewer.isGuest && this.state.loadingProgress < 100)) {
      children = <Loading loadingProgress={this.state.loadingProgress} />
    }

    if(viewer.isGuest) {
      children = <Login viewer={viewer} />;
    } else {
      children = (
        <div>
          <Header
            viewer={viewer}
            toggleSidebar={this.toggleSidebar}
          />
          <Sidebar
            viewer={viewer}
            sidebarOpened={this.state.sidebarOpened}
          />
          <div style={this.state.sidebarOpened ? styles.content : { ...styles.content, ...styles.sidebarClosed }}>
            {this.props.children}
          </div>
        </div>
      );
    }

    return (
      <IntlProvider locale={'en'} messages={localeData['en']}>
        <MuiThemeProvider muiTheme={theme()}>
          {children}
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

const styles = {
  content: {
    paddingTop: 90,
    minHeight: 400,
    margin: 34,
    paddingLeft: 300,
    fontFamily: 'Montserrat',
  },
  sidebarClosed: {
    paddingLeft: 0,
  },
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        isGuest
        ${Login.getFragment('viewer')}
        ${Sidebar.getFragment('viewer')}
        ${Header.getFragment('viewer')}
      }
    `
  }
});
