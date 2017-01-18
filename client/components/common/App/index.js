import React from 'react';
import Relay from 'react-relay';

// const App = (props) => (
//   <div>Application is served!!</div>
// );

class App extends React.Component {

  render() {
    return <div>Helleleleleleooeoaodfsadfasd fasdf {this.props.viewer.me.firstName}</div>
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        me {
          firstName
        }
        ingredients {
          name
        }
      }
    `
  }
});
