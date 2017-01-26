import React from 'react';
import Relay from 'react-relay';
import NodeSelector from 'components/utils/NodeSelector';

export class GenreSelector extends React.Component {

  render() {
    const {
      genres,
      selectedGenre,
      ...props,
    } = this.props;

    return (
      <NodeSelector
        nodes={genres}
        selectedNode={selectedGenre}
        floatingLabelText="Genre Hinzufügen"
        mustExist={true}
        resetOnSelect={true}
        {...props}
      />
    );
  }
}

export default Relay.createContainer(GenreSelector, {
  fragments: {
    genres: () => Relay.QL`
      fragment on GenreConnection {
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
