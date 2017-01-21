import React, { Children, Component, PropTypes } from 'react'
import withSideEffect from 'react-side-effect'
import { withState } from 'recompose'
import { Link } from 'react-router'
import Icon from 'components/utils/Icon'
import ICONS from 'components/utils/Icons'
import theme from 'themes/main'
import { FormattedMessage } from 'react-intl'


const toolbarItem = ( item, i ) => (
  <Link onClick={ item.onClick } style={ styles.link } key={ i } >
    <Icon icon={ ICONS[item.icon.toUpperCase()] } style={ styles.icons } />
    {item.message}
  </Link>
)

const Toolbar = ({ left = [], right = [] }) => {
  return (
    <div style={ styles.root }>
      { left.map(toolbarItem) }
      { right.map(toolbarItem) }
    </div>
  )
}

Toolbar.propTypes = {
  left: PropTypes.array,
  right: PropTypes.array,
}

const styles = {
  root: {
    fontFamily: 'Roboto, sans-serif',
    paddingRight: 12,
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#4ba3e1',
    cursor: 'pointer'
  },
  icons: {
    height: 26,
    width: 26,
    display: 'block',
    position: 'absolute',
    top: 0,
    margin: '-4px 0 0 -28px',
    color: '#4ba3e1'
  },
}

export default Toolbar;
