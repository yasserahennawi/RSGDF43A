import Relay from 'react-relay';

export const prepareEditProductParams = (params, { location }) => {
  return {
    productId: params.productId,
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
  product: Component => Relay.QL`
    query {
      node(id: $productId) {
        ${Component.getFragment('product')}
      }
    }
  `,
  nutritions: Component => Relay.QL`
    query {
      nutritions {
        ${Component.getFragment('nutritions')}
      }
    }
  `,
  genres: Component => Relay.QL`
    query {
      genres {
        ${Component.getFragment('genres')}
      }
    }
  `,
};
