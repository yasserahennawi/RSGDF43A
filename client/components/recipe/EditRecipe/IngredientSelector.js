import React from 'react';
import Relay from 'react-relay';
import NodeSelector from 'components/utils/NodeSelector';

export class IngredientSelector extends React.Component {

  render() {
    const {
      ingredients,
      selectedIngredient,
      ...props,
    } = this.props;

    return (
      <NodeSelector
        nodes={ingredients}
        selectedNode={selectedIngredient}
        floatingLabelText="ZUTAT"
        hintText="Zutat hinzufugen"
        mustExist={true}
        {...props}
      />
    );
  }
}

export default Relay.createContainer(IngredientSelector, {
  fragments: {
    ingredients: () => Relay.QL`
      fragment on IngredientConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `
  }
});
