import React from 'react';

import MenuItem from 'material-ui/MenuItem';

import SelectField from 'components/utils/SelectField';

const InputField = ({ style, ...props }) => (
  <SelectField
    floatingLabelText="ERNAHRUNGSART"
    style={{ ...styles.select, ...style }}
    value={2}
    {...props}
  >
    <MenuItem
      value={1}
      primaryText="Mit Fleisch"
    />
    <MenuItem
      value={2}
      primaryText="Vegetarisch"
    />
    <MenuItem
      value={3}
      primaryText="Pescetarisch"
    />
    <MenuItem
      value={4}
      primaryText="Vegan"
    />
  </SelectField>
);

const styles = {
  select: {
  },
};

export default InputField;
