import React from 'react';
import { style } from 'glamor';
import Edit from './Edit';

const EditBlock = ({children}) => {
  return (
    <div className={ediiteContainer}>
      <div className={icone}>
        <Edit />
      </div>
      <div className={hr}>
          {children}
      </div>
      <div {...style({marginLeft:30,   borderBottom: '2px solid #eaeaea'})}></div>
    </div>
  );
}

const ediiteContainer = style({
  marginTop: 10,
  marginBottom: 30,
});

const hr = style({

});

const icone = style({
  fontSize: 15,
  color: '#ABABAB',
  backgroundColor: '#F9F9F9',
  padding: '0 5px',
  textTransform: 'uppercase',
  float: 'right',
});

export default EditBlock;
