import React from 'react';

import Chip from 'material-ui/Chip';

const ChipContainer = ({ containerStyle, style, chips, onRequestDelete, ...props }) => (
  <div style={{ ...styles.container, ...containerStyle }}>
    {chips.map(chip => (
      <Chip
        onRequestDelete={() => onRequestDelete(chip)}
        style={{ ...styles.chip, style }}
        children={chip.name}
        key={chip.name}
        {...props}
      />
    ))}
  </div>
);

const styles = {
  container: {
    display: 'flex',
    margin: 20,
    marginTop: 5,
  },
  chip: {
    marginRight: 10,
    borderRadius: 4,
    fill: '#e0e0e0',
  },
};

export default ChipContainer;
