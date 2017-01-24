import React from 'react';

import TextField from 'material-ui/TextField';
import { FormsyText } from 'formsy-material-ui/lib';
import { isValidationError, getErrorValidationMessage } from 'helpers/error';

class InputField extends React.Component {
  componentWillMount() {
    this.setState({
      isDirty: false,
    });
  }

  getError(validator, validatorMessage, value) {
    if(this.state.isDirty && (!value || !validator(value))) {
      return validatorMessage;
    }
  }

  render() {
    const {
      name,
      validator,
      validatorMessage,
      apiError,
      formsy,
      style,
      inputStyle,
      floatingLabelStyle,
      hintStyle,
      value,
      textareaStyle,
      ...props,
    } = this.props;

    if(validatorMessage) {
      return (
        <TextField
          name={name}
          onBlur={() => this.setState({ isDirty: true })}
          errorText={this.getError(validator, validatorMessage, value)}
          underlineShow={false}
          floatingLabelFixed={true}
          floatingLabelStyle={{ ...styles.floatingLabel, ...floatingLabelStyle }}
          hintStyle={{ ...styles.hint, ...hintStyle }}
          style={{ ...styles.textField, ...style }}
          inputStyle={{ ...styles.inputStyle, ...inputStyle }}
          textareaStyle={{ ...styles.textareaStyle, ...textareaStyle }}
          value={value}
          errorStyle={styles.errorStyle}
          {...props}
        />
      );
    }

    if(formsy) {
      return (
        <FormsyText
          name={name}
          underlineShow={false}
          floatingLabelFixed={true}
          floatingLabelStyle={{ ...styles.floatingLabel, ...floatingLabelStyle }}
          hintStyle={{ ...styles.hint, ...hintStyle }}
          style={{ ...styles.textField, ...style }}
          inputStyle={{ ...styles.inputStyle, ...inputStyle }}
          textareaStyle={{ ...styles.textareaStyle, ...textareaStyle }}
          value={value}
          errorStyle={styles.errorStyle}
          {...props}
        />
      );
    }

    return (
      <TextField
        name={name}
        underlineShow={false}
        floatingLabelFixed={true}
        floatingLabelStyle={{ ...styles.floatingLabel, ...floatingLabelStyle }}
        hintStyle={{ ...styles.hint, ...hintStyle }}
        style={{ ...styles.textField, ...style }}
        inputStyle={{ ...styles.inputStyle, ...inputStyle }}
        textareaStyle={{ ...styles.textareaStyle, ...textareaStyle }}
        value={value}
        errorStyle={styles.errorStyle}
        {...props}
      />
    );
  }
}

const styles = {
  textField: {
    border: '1px solid #EEEEEE',
    borderRadius: 5,
    backgroundColor: 'white',
    width: '100%',
    paddingLeft: 10,
    height: 40,
    margin: 20,
  },
  disabledField: {
    border: '1px solid #EEEEEE',
    borderRadius: 5,
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 10,
    height: 40,
    marginBottom: 30,
    marginRight: 20,
    marginTop: 5,
  },
  floatingLabel: {
    top: -5,
    textTransform: 'uppercase',
    left: 0,
  },
  hint: {
    bottom: 8,
  },
  inputStyle: {
    marginTop: 0,
  },
  textareaStyle: {
    marginTop: 5,
  },
  errorStyle: {
    marginTop: 20
  }
};

export default InputField;
