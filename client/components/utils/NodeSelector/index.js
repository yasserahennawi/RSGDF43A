import React from 'react';
import Relay from 'react-relay';
import AutoComplete from 'material-ui/AutoComplete'
import { isValidationError, getErrorValidationMessage } from 'helpers/error';
import SelectField from 'components/utils/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
  };

  getNodes() {
    if(this.props.nodes.edges) {
      return this.props.nodes.edges.map(({node}) => node);
    }
    return [];
  }

  getNodeById(id) {
    return this.getNodes().find(node => node.id === id);
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
      onSelect,
      ...props
    } = this.props;

    return (
      <SelectField
        validator={validator}
        validatorMessage={validatorMessage}
        floatingLabelText={floatingLabelText}
        value={selectedNode ? selectedNode.id : null}
        onChange={(e, key, value) => onSelect(this.getNodeById(value))}
        disabled={disabled}
        {...props}
      >
      {nodes.edges.map(({node}) => (
        <MenuItem value={node.id} primaryText={node.name} />
      ))}
      </SelectField>
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
