import React from 'react';

import MenuItem from 'material-ui/MenuItem';

import SelectField from 'components/utils/SelectField';

const units = {
  mg: 'mg',
  g: 'g',
  el: 'EL',
  tl: 'TL',
  ml: 'ml',
}

const unitsKeys = Object.keys( units )

const IngredientUnitSelectField = ({ style, value, ...props }) => console.log( 'value ', value ) || (
  <SelectField
    floatingLabelText="Einheit"
    name="unit"
    formsy
    style={{ ...styles.select, ...style }}
    value={ value }
    {...props}
  >
    { unitsKeys.map( ( unit ) => (
      <MenuItem
        value={ unit }
        primaryText={ units[unit] }
        selected={ unit === value }
      /> ) ) }
  </SelectField>
);

const styles = {
  select: {
  },
};

export default IngredientUnitSelectField;
