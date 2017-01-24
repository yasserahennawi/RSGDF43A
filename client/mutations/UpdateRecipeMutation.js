import Relay from 'react-relay';

class UpdateRecipeMutation extends Relay.Mutation {
  static fragments = {
    recipe: () => Relay.QL`
      fragment on Recipe {
        id
      }
    `
  }

  getMutation() {
    return Relay.QL`
      mutation {
        updateRecipe
      }
    `;
  }

  getVariables() {
    return {
      id: this.props.recipe.id,
      name: this.props.name,
      difficulity: this.props.difficulity,
      orientation: this.props.orientation.id,
      nutrition: this.props.nutrition.id,
      preparationTimeMin: this.props.preparationTimeMin,
      preparationInstructions: this.props.preparationInstructions,
      calories: this.props.calories,
      product: this.props.product.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateRecipePayload {
        recipe
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        recipe: this.props.recipe.id,
      }
    }];
  }
}

export default UpdateRecipeMutation;
