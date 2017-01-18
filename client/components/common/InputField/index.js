import React from 'react';

import TextField from 'material-ui/TextField';
import { FormsyText } from 'formsy-material-ui/lib';

const InputField = ({ formsy, style, inputStyle, floatingLabelStyle, hintStyle, ...props }) => (
  formsy ?
    <FormsyText
      underlineShow={false}
      floatingLabelFixed={true}
      floatingLabelStyle={{ ...styles.floatingLabel, ...floatingLabelStyle }}
      hintStyle={{ ...styles.hint, ...hintStyle }}
      style={{ ...styles.textField, ...style }}
      inputStyle={{ ...styles.inputStyle, ...inputStyle }}
      {...props}
    /> :
    <TextField
      underlineShow={false}
      floatingLabelFixed={true}
      floatingLabelStyle={{ ...styles.floatingLabel, ...floatingLabelStyle }}
      hintStyle={{ ...styles.hint, ...hintStyle }}
      style={{ ...styles.textField, ...style }}
      inputStyle={{ ...styles.inputStyle, ...inputStyle }}
      {...props}
    />
);

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
};

export default InputField;
