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
    resetOnSelect: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  };


  static defaultProps = {
    disabled: false,
    mustExist: false,
    openOnFocus: true,
    resetOnSelect: false,
  }

  componentWillMount() {
    this.setState({
      isDirty: false,
      searchText: this.props.selectedNode ? this.props.selectedNode.name : '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedNode !== this.props.selectedNode) {
      this.setState({
        searchText: this.props.selectedNode ? this.props.selectedNode.name : '',
      });
    }
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

  getError(validator, validatorMessage, node) {
    if(this.state.isDirty && (!node || !validator(node.name))) {
      return validatorMessage;
    }
  }

  handleSelect(value) {
    if(typeof value === "object") {
      this.props.onSelect(value);
    } else if(this.props.mustExist) {
      this.props.onSelect({ name: '' });
    } else {
      // New node...
      this.props.onSelect({ name: value });
    }

    if((this.props.resetOnSelect && !!this.state.searchText) || !this.state.isDirty) {
      this.setState({
        searchText: this.props.resetOnSelect ? '' : this.state.searchText,
        isDirty: true,
      });
    }
  }

  handleUpdateInput(searchText) {
    this.setState({ searchText, isDirty: true });
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
      style,
      resetOnSelect,
      nodes,
      mustExist,
      relay,
      ...props
    } = this.props;

    return (
      <AutoComplete
        onBlur={() => {
          this.handleSelect(this.state.searchText);
        }}
        searchText={this.state.searchText}
        dataSource={this.getNodes()}
        errorText={this.getError(validator, validatorMessage, selectedNode)}
        floatingLabelText={floatingLabelText}
        hintText={hintText}
        dataSourceConfig={dataSourceConfig}
        openOnFocus={openOnFocus}
        filter={AutoComplete.fuzzyFilter}
        onNewRequest={this.handleSelect.bind(this)}
        onUpdateInput={this.handleUpdateInput.bind(this)}
        style={style || styles.autocomplete}
        disabled={disabled}
        fullWidth={true}
        {...props}
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
