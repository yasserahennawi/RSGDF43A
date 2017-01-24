import Relay from 'react-relay';

class UpdateProductMutation extends Relay.Mutation {
  static fragments = {
    product: () => Relay.QL`
      fragment on Product {
        id
      }
    `
  }

  getMutation() {
    return Relay.QL`
      mutation {
        updateProduct
      }
    `;
  }

  getVariables() {
    return {
      id: this.props.product.id,
      name: this.props.name,
      author: this.props.author.id,
      genres: this.props.genres.edges.map(({ node }) => node.id),
      nutrition: this.props.nutrition.id,
      noOfRecipes: this.props.noOfRecipes,
      orderDescription: this.props.orderDescription,
      coverImage: {
        src: this.props.coverImage.src,
        versions: this.props.coverImage.versions.map(version => ({
          src: version.src,
          width: version.width,
          height: version.height,
        }))
      },
      price: {
        value: this.props.price.value,
        currency: this.props.price.currency,
      },
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateProductPayload {
        product
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        product: this.props.product.id,
      }
    }];
  }
}

export default UpdateProductMutation;
