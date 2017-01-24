import React from 'react';
import Relay from 'react-relay';
import NodeSelector from 'components/utils/NodeSelector';

export class OrientationSelector extends React.Component {

  render() {
    const {
      orientations,
      selectedOrientation,
      ...props,
    } = this.props;

    return (
      <NodeSelector
        nodes={orientations}
        selectedNode={selectedOrientation}
        floatingLabelText="Ernährungsart"
        hintText="Alle Arten"
        mustExist={true}
        {...props}
      />
    );
  }
}

export default Relay.createContainer(OrientationSelector, {
  fragments: {
    orientations: () => Relay.QL`
      fragment on OrientationConnection {
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
