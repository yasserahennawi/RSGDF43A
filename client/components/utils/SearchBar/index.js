
import React, { PropTypes } from 'react'

import Icon from 'components/utils/Icon'
import ICONS from 'components/utils/Icons'
import InputField from 'components/utils/InputField'

const SearchBar = ( { onPerform } ) => (
  <section className='search-bar' style={ styles.searchBar }>
    <Icon icon={ICONS.ZOOMMIN} style={ styles.icon } containerStyle={ styles.iconContainer } />
    <InputField
      name="search"
      hintText="Search"
      style={styles.search}
      onKeyUp={ (event) => event.keyCode == 13 ? onPerform( event.target.value ) : void(0) } />
  </section>
)

SearchBar.propTypes = {
  onPerform: PropTypes.func.isRequired,
}

const styles = {
  searchBar: {
    position: 'relative',
    maxWidth: 800,
    paddingLeft: 13,
  },
  search: {
    margin: 0,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    left: 'auto',
    zIndex: 4000,
  },
  icon: {
    fill: '#999999'
  },
}

export default SearchBar
