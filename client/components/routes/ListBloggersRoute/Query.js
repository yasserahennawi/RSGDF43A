import Relay from 'react-relay';

export function prepareBloggersRouteParams(params, { location }) {
  return {
    // @TODO return this to an array once this issue is resolved
    // https://github.com/relay-tools/react-router-relay/issues/218
    userTypes: "blogger,publisher",
  };
}

export default {
  viewer: Component => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `,
  users: Component => Relay.QL`
    query {
      users(userTypes: $userTypes) {
        ${Component.getFragment('users')}
      }
    }
  `
};
