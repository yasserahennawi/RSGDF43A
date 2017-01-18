import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { style, hover } from 'glamor';

import colors from 'themes/colors';

const Box = ({ text, value, onClick }) => {
  const cursor = onClick ? 'pointer' : '';

  return (
    <div
      {...style({background: '#007dcc', padding: '6px 8px', borderRadius: 3, textAlign: 'center', cursor})}
      {...hover({background: '#50e3c2', color: '#007dcc'})}
      onClick={onClick ? onClick : ''}
    >
      <p {...style({margin: '0', marginTop: 5, color: 'white'})}>{value}</p>
      <p className={`${p}`}>{text}</p>
    </div>
  )
};

const renderOnlineIcon = () => (
  <svg width="13" height="8">
    <circle cx="5" cy="4" r="4" fill="#50E3C2" />
  </svg>
);

function Profile(props) {
    return (
      <div className={`${container}`}>
        <p className={`${nick}`}>{ ( props.Viewer || {} ).name_first }</p>
        <p className={`${p}`} {...style({  marginTop: -7})}>{renderOnlineIcon()} online</p>
        <div className={`${boxContainer}`}>
          <Box text="specials" value="0"/>
          <Box text="Verkauft" value="0"/>
          <Box text="erhalten" value="0 €" onClick={() => props.router.push('/userAccounting')} />
        </div>
      </div>
    );
}

export default withRouter(Profile);

const container = style({
  padding: '1.8em',
  color: 'white',
  fontFamily: 'Montserrat',
  fontWeight: 200,
  color: colors.textGreen,
  margin: 5,
});

const boxContainer = style({
  marginTop: 40,
  display: 'flex',
  justifyContent: 'space-between',
});

const p = style({
  textTransform: 'uppercase',
  fontSize: 10,
})
const nick = style({
  color: 'white',
  fontSize: 18,
})
