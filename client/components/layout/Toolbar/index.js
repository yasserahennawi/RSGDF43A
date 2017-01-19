import React, { Children, Component, PropTypes } from 'react'
import withSideEffect from 'react-side-effect'
import { withState } from 'recompose'
import { Link } from 'react-router'
import Icon from 'components/utils/Icon'
import ICONS from 'components/utils/Icons'
import theme from 'themes/main'
import { FormattedMessage } from 'react-intl'


const contentDefault = { left: [], right: [] }
const handler = { updateContent: () => void(0) }

const toolbarItem = ( item, i ) => (
  <Link onClick={ item.onClick } style={ styles.link } key={ i } >
    <Icon icon={ ICONS[item.icon.toUpperCase()] } style={ styles.icons } />
    <FormattedMessage id={ item.message } />
  </Link>
)

const _Toolbar = ({ content, updateContent }) => {
  handler.updateContent = updateContent

  return (
    <div style={ styles.root }>
      { content.left.map(toolbarItem) }
      { content.right.map(toolbarItem) }
    </div>
  )
}

_Toolbar.propTypes = {
  content: PropTypes.object,
  updateContent: PropTypes.func,
}

export const hoc = withState( 'content', 'updateContent', contentDefault )

export const Toolbar = hoc(_Toolbar)

class ToolbarItems extends Component {
  render() {
    return this.props.children? Children.only(this.props.children) : null
  }
}

ToolbarItems.propTypes = {
  children: PropTypes.node,
  left: PropTypes.arrayOf(PropTypes.object),
  right: PropTypes.arrayOf(PropTypes.object),
}

const reverseList = ( fw ) => ( propList ) => fw(propList.reverse())

const notUndefOrDef = ( def ) => ( filter ) =>
  ( list ) => (list.filter( filter )[0] || {}).left || def
const getLastItem = ( name ) => notUndefOrDef( contentDefault[name] )(
  (prop) => prop[name] !=  undefined
)
const getLeft = getLastItem( 'left' )
const getRight = getLastItem( 'right' )

const reducePropsToState = reverseList((propsList) => (
  { left: getLeft(propsList) , right: getRight(propsList) }
) )

function handleStateChangeOnClient({ left, right }) {

  handler.updateContent({ left, right })
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

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)( ToolbarItems );
