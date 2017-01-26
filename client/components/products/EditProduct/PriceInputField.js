import React from 'react';
import InputField from 'components/utils/InputField';

export default ({ value, validator, onChange, ...props }) => (
  <InputField
    validator={(_value) => validator(_value.toString().replace(',', '.'))}
    value={value && value.replace ? value.replace('.', ',') : value}
    onChange={(e) => onChange(e.target.value.replace(',', '.'))}
    {...props}
  />
);
