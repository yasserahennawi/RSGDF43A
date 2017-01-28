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
      calories: parseFloat(this.props.calories),
      coverImage: {
        src: this.props.coverImage.src,
        versions: this.props.coverImage.versions.map(version => ({
          src: version.src,
          width: version.width,
          height: version.height,
        }))
      },
      product: this.props.product.id,
      items: this.props.items.edges.map(({node}) => ({
        addition: node.addition,
        newIngredientName: node.newIngredientName,
        ingredient: node.ingredient && node.ingredient.id,
        quantity: node.quantity,
        unit: node.unit,
      }))
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
