import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const InputField = ({ style, buttonType = 'raised', buttonStyle, labelStyle, primary, backgroundColor, labelColor, ...props }) => (
  buttonType === 'raised' ?
    <RaisedButton
      labelColor={labelColor || (primary ? 'white' : '#A1A1A1')}
      backgroundColor={backgroundColor || (primary ? '#50E3C2' : '#D5D5D5')}
      style={{ ...styles.buttonContainer, ...style }}
      buttonStyle={{ ...styles.button, ...buttonStyle }}
      labelStyle={{ ...styles.label, ...labelStyle }}
      {...props}
    /> :
    <FlatButton
      backgroundColor={backgroundColor || (primary ? '#50E3C2' : '#D5D5D5')}
      labelStyle={{ ...styles.label, ...labelStyle }}
      style={{ ...styles.buttonContainer, ...style }}
      {...props}
    />
);

const styles = {
  buttonContainer: {
    boxShadow: 'none',
  },
  button: {
    padding: 5,
    height: 'initial',
  },
  label: {
    fontSize: 16,
    fontWeight: 400,
  },
};

export default InputField;
