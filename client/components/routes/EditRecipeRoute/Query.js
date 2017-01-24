import Relay from 'react-relay';

export const prepareEditProductParams = (params, { location }) => {
  return {
    recipeId: params.recipeId,
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
  recipe: Component => Relay.QL`
    query {
      node(id: $recipeId) {
        ${Component.getFragment('recipe')}
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
  orientations: Component => Relay.QL`
    query {
      orientations {
        ${Component.getFragment('orientations')}
      }
    }
  `,
};
