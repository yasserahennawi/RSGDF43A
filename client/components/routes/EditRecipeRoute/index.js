import React from 'react';
import Relay from 'react-relay';
import styles from './styles';
import Formsy from 'formsy-react'
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import SnackbarError from 'components/utils/SnackbarError';
import StepperLayout from 'components/layout/StepperLayout';
import EditRecipe from 'components/recipe/EditRecipe';

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
    else {
      this.setState({ errorMessage: "Wait for this book to be accepted" });
    }
  }

  renderSuccessMessage() {
    return (
      <div>
        <h2>All recipes has been created successfully</h2>
        <h4>And waiting to be accepted</h4>
      </div>
    );
  }

  renderEditRecipe() {
    return (
      <EditRecipe
        viewer={this.props.viewer}
        nutritions={this.props.nutritions}
        orientations={this.props.orientations}
        recipe={this.props.recipe}
        product={this.props.product}
        onRecipeCreateSuccess={({ recipe }) => console.log("New recipe has been created", recipe)}
        onRecipeUpdateSuccess={({ recipe }) => console.log("Recipe has been updated", recipe)}
      />
    );
  }

  render() {
    const breadcrumbs = [
      { path: '/new', name: 'Neues Special' },
    ];
    return (
      <StepperLayout
        title={`NEUES SPECIAL / REZEPTE NR. ${this.props.product.createdRecipesCount + 1}`}
        subtitle={`Um dein Special zu fertigen, fuge ${this.props.product.noOfRecipes} Rezepte hinzu`}
        breadcrumbs={breadcrumbs}
        stepIndex={1}
        onStepChange={this.onStepChange.bind(this)}
        steps={['COVER KREIERE', 'REZEPTE HINZUFUGEN', 'AKZEPTIERUNG WARTEN', 'VERKAUFEN']}>
        {this.props.product.createdRecipesCount >= this.props.product.noOfRecipes ?
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
        ${EditRecipe.getFragment('recipe')}
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id
        noOfRecipes
        createdRecipesCount
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
  }
});
