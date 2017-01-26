import React from 'react';
import { style } from 'glamor';

const Product = ({ children, cover }) => {
  return (
    <div className={`${container}`}>
      <img src={cover} className={`${imageCover}`} />
      {children}
    </div>
  );
};

const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: 160,
  marginRight: 58,
  marginBottom: 30,
  color: '#565656',
});

const imageCover = style({
  height: 230,
  marginBottom: 20,
  backgroundSize: 'cover',
});

export default Product;
