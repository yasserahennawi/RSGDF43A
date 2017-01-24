import Relay from 'react-relay';

class CreateRecipeMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createRecipe
      }
    `;
  }

  getVariables() {
    return {
      name: this.props.name,
      orientation: this.props.orientation.id,
      difficulity: this.props.difficulity,
      nutrition: this.props.nutrition.id,
      preparationTimeMin: this.props.preparationTimeMin,
      preparationInstructions: this.props.preparationInstructions,
      calories: this.props.calories,
      product: this.props.product.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateRecipePayload {
        recipe
      }
    `;
  }

  getConfigs() {
    return [{
      type: "REQUIRED_CHILDREN",
      children: [
        Relay.QL`
          fragment on CreateRecipePayload {
            recipe {
              id
            }
          }
        `
      ]
    }];
  }
}

export default CreateRecipeMutation;
