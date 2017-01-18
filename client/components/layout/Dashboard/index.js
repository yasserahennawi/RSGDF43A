import React from 'react';
import Icon from 'components/common/Icon';
import ICONS from 'components/common/Icons';
import { css, style } from 'glamor';

import IconButton from 'material-ui/IconButton';

const Dashboard = ({ toggleSidebar, isAdmin }) => (
  <div {...css({display: 'flex', marginLeft: '20'})}>
    <div className={`${link}`}>
      <h3 className={`${title}`}>Dashboard</h3>
      <small className={`${small}`}>tastetastic { isAdmin ? 'blogger' : 'admin' }</small>
    </div>
    <IconButton
      style={styles.iconButton}
      onTouchTap={toggleSidebar}
      disableTouchRipple={true}>
      <Icon icon={ICONS.HAMBU} color="black"/>
    </IconButton>
  </div>
);

const brand = style({
  color: '#333',
  textAlign: 'left',
  margin: 0,
  padding: 1,
});

const link = style({
  color: '#333',
  textDecoration: 'none',
  marginTop: 20,
});

const title = style({
  margin: 0,
  marginTop: 10,
  padding: 0,
  lineHeight: 0.3,
  marginBottom: 2,
});

const small = style({
  textAlign: 'left',
  padding: 0,
  paddingLeft: 1,
  fontSize: 12.5,
  textTransform: 'uppercase',
});

const styles = {
  iconButton: {
    margin: '23px 30px 30px 45px',
    cursor: 'pointer',
    padding: 0,
  },
};

export default Dashboard;
