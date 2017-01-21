import React from 'react';

import SelectField from 'material-ui/SelectField';
import { FormsySelect } from 'formsy-material-ui/lib';

const InputField = ({ formsy, style, ...props }) => (
  formsy ?
    <FormsySelect
      floatingLabelFixed={true}
      underlineShow={false}
      iconStyle={styles.icon}
      menuStyle={styles.menu}
      labelStyle={styles.label}
      floatingLabelStyle={styles.floatingLabel}
      hintStyle={styles.hint}
      style={{ ...styles.select, ...style }}
      {...props}
    /> :
    <SelectField
      floatingLabelFixed={true}
      underlineShow={false}
      iconStyle={styles.icon}
      menuStyle={styles.menu}
      labelStyle={styles.label}
      floatingLabelStyle={styles.floatingLabel}
      hintStyle={styles.hint}
      style={{ ...styles.select, ...style }}
      {...props}
    />
);

const styles = {
  select: {
    border: '1px solid #EEEEEE',
    borderRadius: 5,
    backgroundColor: 'white',
    width: '100%',
    paddingLeft: 10,
    height: 40,
    margin: 20,
  },
  label: {
    top: 6,
  },
  floatingLabel: {
    top: -5,
    textTransform: 'uppercase',
    left: 0,
  },
  hint: {
    //bottom: 8,
  },
  icon: {
    fill: '#525251',
    top: 8,
    //right: 1,
    marginTop: 12,
  },
  menu: {
    marginLeft: -10,
    boxShadow: 'none', // not working
    //border: '3px solid red',
    marginTop: -13,
    paddingLeft: 10,
  },
};

export default InputField;
