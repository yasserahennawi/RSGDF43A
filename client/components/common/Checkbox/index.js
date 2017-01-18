import React from 'react';

import Checkbox from 'material-ui/Checkbox';

const InputField = ({ style, iconStyle, labelStyle, ...props }) => (
  <Checkbox
    style={{ ...styles.checkbox, ...style }}
    iconStyle={{ ...styles.icon, ...iconStyle }}
    labelStyle={{ ...styles.label, ...labelStyle }}
    {...props}
  />
);

const styles = {
  checkbox: {
  },
  icon: {
    color: '#50E3C2',
  },
  label: {
    fontSize: 15,
  },
};

export default InputField;
