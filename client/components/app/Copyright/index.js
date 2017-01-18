import React from 'react';
import { style } from 'glamor';

const Copyright = () => (
  <span className={`${brand}`}>
    © 2016 TasteTastic Scope - System Control Office and Planning Exchange.
  </span>
);

const brand = style({
  color: 'white',
});

export default Copyright;
