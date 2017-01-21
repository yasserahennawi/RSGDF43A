import React from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'components/utils/Breadcrumbs';
import CreateUser from 'components/auth/CreateUser';
import styles from './styles';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import SvgIcon from 'material-ui/SvgIcon';
import { FormattedDate } from 'react-intl';

class CreateBloggerRoute extends React.Component {

  componentWillMount() {
    this.setState({
      stepIndex:  0,
    })
  }

  onUserCreateSuccess({ user }) {
    this.props.router.push(`/members/edit/${user.id}`);
  }

  getUserDetails() {
    return (
      <CreateUser
        isShortCreationMode={true}
        user={null}
        viewer={this.props.viewer}
        onUserCreateSuccess={this.onUserCreateSuccess.bind(this)}
      />
    );
  }

  render() {
    const {
      routes,
      params
    } = this.props;
    return (
      <div>
        <Breadcrumbs
          routes={routes}
          params={params}
        />
        <div style={styles.header}>
          <h1 style={styles.title}>{ 'Neue Mitglieder' }</h1>
          <h4 style={styles.subtitle}>{'Registriert am: '}<FormattedDate value={new Date()} /></h4>
        </div>
        <div style={styles.container}>
          <div>
            {this.getUserDetails()}
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(CreateBloggerRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        firstName
        lastName
        ${CreateUser.getFragment('viewer')}
      }
    `
  }
});
