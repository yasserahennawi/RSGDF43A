import React from 'react';
import Relay from 'react-relay';
import styles from './styles';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import SelectField from 'components/utils/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SnackbarError from 'components/utils/SnackbarError';
import StepperLayout from 'components/layout/StepperLayout';
import EditRecipe from 'components/recipe/EditRecipe';
import * as _ from 'lodash';

class EditRecipeRoute extends React.Component {

  componentWillMount() {
    this.setState({
      errorMessage: ''
    });
  }

  onStepChange(index) {
    if(index === 0) {
      this.props.router.push(`/books/${this.props.product.id}`);
    }
    else if(index > 1) {
      this.setState({ errorMessage: "Wait for this book to be accepted" });
    }
  }

  renderSuccessMessage() {
    return (
      <div>
        <h2>Alle Rezepte wurden erfolgreich erstellt und werden nun geprüft.</h2>
      </div>
    );
  }

  renderEditRecipe() {
    return (
      <EditRecipe
        viewer={this.props.viewer}
        ingredients={this.props.ingredients}
        nutritions={this.props.nutritions}
        orientations={this.props.orientations}
        recipe={this.props.recipe}
        product={this.props.product}
        onRecipeCreateSuccess={({ recipe }) => console.log("New recipe has been created", recipe)}
        onRecipeUpdateSuccess={({ recipe }) => console.log("Recipe has been updated", recipe)}
      />
    );
  }

  hasCreatedAllRecipes() {
    return this.getNumberOfUncreatedRecipes() <= 0;
  }

  getNumberOfUncreatedRecipes() {
    return parseInt(this.props.product.noOfRecipes) - parseInt(this.props.product.createdRecipesCount);
  }

  getRecipeSelector() {
    const {
      product: {
        id,
        createdRecipesCount,
        noOfRecipes,
        recipes,
      },
      router
    } = this.props;

    let newMenuItems;

    if(createdRecipesCount < noOfRecipes) {
      newMenuItems = _.range(this.getNumberOfUncreatedRecipes()).map((i) => (
        <MenuItem key={`new${i}`} value={`new${i}`} primaryText={`Rezepte ${i + createdRecipesCount + 1}`} />
      ));
    }

    let selectedValue = this.props.recipe ? this.props.recipe.id : 'new0';

    return (
      <SelectField
        style={{ width: 'auto' }}
        value={selectedValue}
        onChange={(e, key, recipeId) => {
          router.push(`/books/${id}/recipe/${recipeId}`);
        }}>
        {recipes.edges.map(({ node }, index) => (
          <MenuItem key={index} value={node.id} primaryText={`Rezepte ${node.number}`} />
        ))}
        {newMenuItems}
      </SelectField>
    );
  }

  isNew() {
    return !this.props.recipe;
  }

  getCurrentRecipeNumber() {
    return this.isNew() ? this.props.product.createdRecipesCount + 1 : this.props.recipe.number;
  }

  render() {
    const breadcrumbs = [
      { path: '/new', name: 'Neues Special' },
    ];

    let title = 'NEUES SPECIAL';

    if(! this.hasCreatedAllRecipes()) {
      title += ` / REZEPTE NR. ${this.getCurrentRecipeNumber()}`;
    }

    return (
      <StepperLayout
        rightPanel={this.getRecipeSelector()}
        title={title}
        subtitle={`Um dein Special zu fertigen, fuge ${this.props.product.noOfRecipes} Rezepte hinzu`}
        breadcrumbs={breadcrumbs}
        stepIndex={1}
        onStepChange={this.onStepChange.bind(this)}
        steps={['COVER KREIERE', 'REZEPTE HINZUFUGEN', 'AKZEPTIERUNG WARTEN', 'VERKAUFEN']}>
        {this.isNew() && this.hasCreatedAllRecipes() ?
          this.renderSuccessMessage() : this.renderEditRecipe()}
        <SnackbarError
          error={this.state.errorMessage}
          onDismiss={() => this.setState({ errorMessage: "" })}
        />
      </StepperLayout>
    );
  }
}

export default Relay.createContainer(EditRecipeRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${EditRecipe.getFragment('viewer')}
      }
    `,
    recipe: () => Relay.QL`
      fragment on Recipe {
        id
        number
        ${EditRecipe.getFragment('recipe')}
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id
        noOfRecipes
        createdRecipesCount
        recipes(first: 100) {
          edges {
            node {
              id
              number
            }
          }
        }
        ${EditRecipe.getFragment('product')}
      }
    `,
    orientations: () => Relay.QL`
      fragment on OrientationConnection {
        ${EditRecipe.getFragment('orientations')}
      }
    `,
    nutritions: () => Relay.QL`
      fragment on NutritionConnection {
        ${EditRecipe.getFragment('nutritions')}
      }
    `,
    ingredients: () => Relay.QL`
      fragment on IngredientConnection {
        ${EditRecipe.getFragment('ingredients')}
      }
    `,
  }
});
