import Relay from 'react-relay';

export const prepareProductsRouteParams = (params, { location }) => {
  return {
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
  products: Component => Relay.QL`
    query {
      products(mine: true) {
        ${Component.getFragment('products')}
      }
    }
  `,
};
