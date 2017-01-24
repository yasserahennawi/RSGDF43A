import React from 'react';
import Relay from 'react-relay';
import NodeSelector from 'components/utils/NodeSelector';

export class NutritionSelector extends React.Component {

  render() {
    const {
      nutritions,
      selectedNutrition,
      ...props,
    } = this.props;

    return (
      <NodeSelector
        nodes={nutritions}
        selectedNode={selectedNutrition}
        floatingLabelText="Ernährungsart"
        hintText="Alle Arten"
        mustExist={true}
        {...props}
      />
    );
  }
}

export default Relay.createContainer(NutritionSelector, {
  fragments: {
    nutritions: () => Relay.QL`
      fragment on NutritionConnection {
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
