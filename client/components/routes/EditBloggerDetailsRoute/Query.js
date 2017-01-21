import Relay from 'react-relay';

export default {
  user: Component => Relay.QL`
    query {
      node(id: $userId) {
        ${Component.getFragment('user')}
      }
    }
  `,
  viewer: Component => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `
};
