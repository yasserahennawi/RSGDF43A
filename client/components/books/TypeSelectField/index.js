import React from 'react';

import MenuItem from 'material-ui/MenuItem';

import SelectField from 'components/utils/SelectField';

const TypeSelectField = ({ style, ...props }) => (
  <SelectField
    floatingLabelText="Types"
    style={{ ...styles.select, ...style }}
    {...props}
  >
    <MenuItem
      value={1}
      primaryText="Tasty"
    />
    <MenuItem
      value={2}
      primaryText="Tasty"
    />
    <MenuItem
      value={3}
      primaryText="Tasty"
    />
    <MenuItem
      value={4}
      primaryText="Tasty"
    />
    <MenuItem
      value={5}
      primaryText="Tasty"
    />
  </SelectField>
);

const styles = {
  select: {
  },
};

export default TypeSelectField;
