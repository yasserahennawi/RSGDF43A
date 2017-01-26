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
import EditProduct from 'components/products/EditProduct';

class EditProductRoute extends React.Component {

  componentWillMount() {
    this.setState({
      errorMessage: ''
    });
  }

  onStepChange() {
    if(! this.props.product) {
      this.setState({ errorMessage: "Complete this step first" });
    } else {
      this.props.router.push(`/books/${this.props.product.id}/recipe/new`);
    }
  }

  render() {
    const breadcrumbs = [
      { path: '/new', name: 'Neues Special' },
    ];
    return (
      <StepperLayout
        title="NEUES SPECIAL"
        subtitle="Kreiere dein neues Special und füge deine Rezepte hinzu"
        breadcrumbs={breadcrumbs}
        stepIndex={0}
        onStepChange={this.onStepChange.bind(this)}
        steps={['COVER KREIEREN', 'REZEPTE HINZUFUGEN', 'AKZEPTIERUNG WARTEN', 'VERKAUFEN']}>
        <EditProduct
          viewer={this.props.viewer}
          nutritions={this.props.nutritions}
          genres={this.props.genres}
          product={this.props.product}
          onProductCreateSuccess={({ product }) => this.props.router.push(`/books/${product.id}/recipe/new`)}
          onProductUpdateSuccess={({ product }) => this.props.router.push(`/books/${product.id}`)}
        />
        <SnackbarError
          error={this.state.errorMessage}
          onDismiss={() => this.setState({ errorMessage: "" })}
        />
      </StepperLayout>
    );
  }
}

export default Relay.createContainer(EditProductRoute, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${EditProduct.getFragment('viewer')}
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id
        ${EditProduct.getFragment('product')}
      }
    `,
    genres: () => Relay.QL`
      fragment on GenreConnection {
        ${EditProduct.getFragment('genres')}
      }
    `,
    nutritions: () => Relay.QL`
      fragment on NutritionConnection {
        ${EditProduct.getFragment('nutritions')}
      }
    `,
  }
});
