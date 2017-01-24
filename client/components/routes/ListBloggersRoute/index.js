import React from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'components/utils/Breadcrumbs';
import ListUser from 'components/auth/ListUser';

class ListBloggersRoute extends React.Component {
  render() {
    if(! this.props.viewer.isAdmin) {
      this.props.router.push(`/`);
    }
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
        <ListUser
          users={this.props.users}
          sumary={{authors: {}, publishers: {}}}
          rows={[]}
        />
      </div>
    );
  }
}

export default Relay.createContainer(ListBloggersRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        firstName
        lastName
        isAdmin
      }
    `,
    users: () => Relay.QL`
      fragment on UserConnection {
        ${ListUser.getFragment('users')}
      }
    `,
  }
});
