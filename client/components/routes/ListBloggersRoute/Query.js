import Relay from 'react-relay';

export default {
  root: Component => Relay.QL`
    query {
      root(token: $userToken) {
        ${Component.getFragment('root')}
      }
    }
  `
};
