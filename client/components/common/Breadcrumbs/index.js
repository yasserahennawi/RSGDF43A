import React from 'react';
import { Link } from 'react-router';
import Icon from 'components/common/Icon';
import ICONS from 'components/common/Icons';
import muiTheme from 'themes/main';
import { FormattedMessage } from 'react-intl';


const defaultItem = {
  first: true,
  to: '/',
  icon: ICONS.HOME,
  caption: null,
}

const breadcrumb = (item, i) => (
  <li style={ styles.li } key={ i }>
    { item.first ? null : <div style={ styles.separator }>{ '/' }</div> }
    <Link to={ item.to } style={ styles.link }>
      { item.icon ? <Icon icon={item.icon} style={ styles.icons } /> : null }
      { item.caption? <FormattedMessage id={ item.caption } /> : item.plain }
    </Link>
  </li>
)

const Breadcrumbs = ({ path }) => {
  return (
    <ol className='breadcrumbs' style={ styles.root }>
      { breadcrumb(defaultItem) }
      { path.map(breadcrumb) }
    </ol>
  )
}

const styles = {
  root: {
    padding: '35px 50px',
    fontFamily: 'Roboto, sans-serif',
  },
  li: {
    display: 'inline-block',
    position: 'relative',
  },
  link: {
    color: 'gray',
    textDecoration: 'none',
    fontSize: 14,
    color: muiTheme().baseTheme.palette.primary2Color,
  },
  separator: {
    display: 'inline-block',
    fontSize: 16,
    margin: '2px 12px 0 12px',
    color: muiTheme().baseTheme.palette.primary3Color,
  },
  icons: {
    height: 24,
    width: 24,
    display: 'block',
    position: 'absolute',
    top: 0,
    margin: '-17px 0 0 -30px',
    color: muiTheme().listItem.leftIconColor,
  },
}
export default Breadcrumbs
