import React from 'react';
import Relay from 'react-relay';

class HomeRoute extends React.Component {
  render() {
    return (
      <div>Welome { this.props.root.viewer.firstName }!</div>
    );
  }
}

export default Relay.createContainer(HomeRoute, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        viewer {
          firstName
          lastName
        }
      }
    `
  }
});
