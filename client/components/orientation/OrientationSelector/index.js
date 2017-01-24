import React from 'react';
import Relay from 'react-relay';
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete'

const dataSourceConfig = {
  text: 'name',
  value: 'id'
};

export class OrientationSelector extends React.Component {

  getOrientations() {
    return this.props.orientations.edges.map(({node}) => node);
  }

  getOrientationByName(name) {
    return this.getOrientations().find(orientation => orientation.name.toLowerCase() === name.toLowerCase());
  }

  handleSelectOrientation(object) {
    // Select the id
    if(object.id) {
      return this.props.onSelect(object.id);
    }
    // Check if a orientation exists
    else if (this.getOrientationByName(object)) {
      this.props.onSelect(this.getOrientationByName(object).id);
    } else {
      // New orientation so pass it as a string and the backend will handle that
      this.props.onSelect(object);
    }
  }

  render() {
    const { name, genres, openOnFocus, required } = this.props;
    return (
      <FormsyAutoComplete
        name={name}
        dataSource={this.getOrientations()}
        dataSourceConfig={dataSourceConfig}
        openOnFocus={openOnFocus}
        floatingLabelText="Ernährungsart"
        hintText="Alle Arten"
        filter={AutoComplete.fuzzyFilter}
        onNewRequest={ this.handleSelectOrientation.bind(this) }
        required={required}
        style={styles.autocomplete}
      />
    );
  }
}

const styles = {
  autocomplete: {
    height: 76,
    margin: 21,
  }
};

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
