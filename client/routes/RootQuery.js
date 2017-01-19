import Relay from 'react-relay';
import { getUserToken } from 'helpers/storage';

export const prepareUserTokenParams = () => ({
  userToken: getUserToken(),
});

export default {
  root: Component => Relay.QL`
    query {
      root(token: $userToken) {
        ${Component.getFragment('root')}
      }
    }
  `
};
