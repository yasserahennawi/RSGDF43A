import React from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'components/utils/Breadcrumbs';

class HomeRoute extends React.Component {
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
          isAdmin={this.props.viewer.isAdmin}
        />
        <div>Herzlichen Willkommen { this.props.viewer.firstName }!</div>
      </div>
    );
  }
}

export default Relay.createContainer(HomeRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        firstName
        lastName
        isAdmin
      }
    `
  }
});
