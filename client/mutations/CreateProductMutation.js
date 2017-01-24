import Relay from 'react-relay';

class CreateProductMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createProduct
      }
    `;
  }

  getVariables() {
    return {
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
      fragment on CreateProductPayload {
        product
      }
    `;
  }

  getConfigs() {
    return [{
      type: "REQUIRED_CHILDREN",
      children: [
        Relay.QL`
          fragment on CreateProductPayload {
            product {
              id
            }
          }
        `
      ]
    }];
  }
}

export default CreateProductMutation;
