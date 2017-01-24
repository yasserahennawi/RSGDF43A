import React from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete'
import { isValidationError, getErrorValidationMessage } from 'helpers/error';

const dataSourceConfig = {
  text: 'name',
  value: 'id'
};

export class NodeSelector extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.shape({
      edges: React.PropTypes.arrayOf(React.PropTypes.shape({
        node: React.PropTypes.shape({
          name: React.PropTypes.string,
        })
      }))
    }),
    onSelect: React.PropTypes.func.isRequired,
    selectedNode: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    validator: React.PropTypes.func.isRequired,
    validatorMessage: React.PropTypes.string,
    openOnFocus: React.PropTypes.bool,
    mustExist: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  };


  static defaultProps = {
    disabled: false,
    mustExist: false,
    openOnFocus: true,
  }

  componentWillMount() {
    this.setState({
      isDirty: false,
    });
  }

  getNodes() {
    if(this.props.nodes.edges) {
      return this.props.nodes.edges.map(({node}) => node);
    }
    return [];
  }

  getNodeByName(name) {
    return this.getNodes().find(node => node.name.toLowerCase() === name.toLowerCase());
  }

  getNodeById(id) {
    return this.getNodes().find(node => node.id === id);
  }

  handleSelectNode(value) {
    const node = typeof value === "string" ? this.getNodeByName(value) : this.getNodeById(value.id);

    if(node) {
      this.props.onSelect(node);
    } else if(this.props.mustExist) {
      this.props.onSelect(null);
    } else {
      // New node...
      this.props.onSelect({ name: value });
    }
  }

  getError(validator, validatorMessage, node) {
    if(this.state.isDirty && (!node || !validator(node.name))) {
      return validatorMessage;
    }
  }

  render() {
    const {
      validator,
      validatorMessage,
      openOnFocus,
      selectedNode,
      floatingLabelText,
      hintText,
      disabled,
    } = this.props;

    return (
      <AutoComplete
        onBlur={() => this.setState({ isDirty: true })}
        searchText={selectedNode ? selectedNode.name : ''}
        dataSource={this.getNodes()}
        errorText={this.getError(validator, validatorMessage, this.props.selectedNode)}
        floatingLabelText={floatingLabelText}
        hintText={hintText}
        dataSourceConfig={dataSourceConfig}
        openOnFocus={openOnFocus}
        filter={AutoComplete.fuzzyFilter}
        onUpdateInput={ this.handleSelectNode.bind(this) }
        onNewRequest={ this.handleSelectNode.bind(this) }
        style={styles.autocomplete}
        disabled={disabled}
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

export default NodeSelector;
