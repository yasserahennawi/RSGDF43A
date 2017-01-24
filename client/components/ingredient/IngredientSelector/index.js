import React from 'react';
import Relay from 'react-relay';
import NodeSelector from 'components/utils/NodeSelector';

export class IngredientSelector extends React.Component {

  render() {
    const {
      genres,
      selectedIngredient,
    } = this.props;

    return (
      <NodeSelector
        nodes={genres}
        selectedNode={selectedIngredient}
        {...props}
      />
    );
  }
}

export default Relay.createContainer(IngredientSelector, {
  fragments: {
    genres: () => Relay.QL`
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
