import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

const Box = ({ boxes, style }) => (
  <div style={styles.container}>
    {boxes.map((box, key) => {
      let boxStyle = { ...styles.box, ...box.boxStyle };
      if (key !== (boxes.length - 1)) {
        boxStyle = {
          ...boxStyle,
          marginRight: 15,
        };
      }

      return (
        <div style={{...boxStyle, ...style}} key={`${box.value}-${box.text}-${key}`}>
          <p style={{...styles.value, ...box.valueStyle}}>
            {box.value}
          </p>

          <p style={{...styles.text, ...box.textStyle}}>
            {box.text}
          </p>
        </div>
      )
    })}
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    background: '#EFEFEF',
    padding: '15px 0px',
    textAlign: 'center',
    width: 75,
    borderRadius: '5px',
  },
  value: {
    color: '#1886CE',
    marginTop: 0,
    marginBottom: 3,
  },
  text: {
    margin: 0,
    color: '#A9A9A9',
    textTransform: 'uppercase',
    fontSize: 10,
  },
};

export default Box;
