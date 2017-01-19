import React from 'react';

const ProgressBar = ({ value }) => {
  return (
    <div style={{ width: '100%' }}>
      <div style={styles.container}>
        <div style={{...styles.bar, width: `${value + 5}%`}}/>
      </div>

      <h3 style={styles.progress}>{Math.round(value)}%</h3>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 150,
    backgroundColor: '#007DCC',
    height: 7,
  },
  bar: {
    backgroundColor: '#48CCAD',
    height: 7,
    backgroundImage: '-webkit-linear-gradient(-60deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,'
    + 'rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
    backgroundSize: '30px 16px',
    borderRadius: 5,
    transitionProperty: 'width',
    transitionDuration: '0.5s',
  },
  progress: {
    color: '#4FE2C2',
    textAlign: 'center',
  },
};

export default ProgressBar;
