import React, { PropTypes } from 'react'
import SvgIcon from 'material-ui/SvgIcon';

const Path = ({ d }) => (<path d={ d }></path>)

const Icon = ({ icon, noTransform, containerStyle, ...props }) => (
  <SvgIcon viewBox="0, 0, 1024, 1024" { ...props }>
    { icon.constructor === Array ? icon.map((d, i) => <Path d={ d } key={ i } />) : <Path d={icon} />  }
  </SvgIcon>
)

Icon.propTypes = {
  icon: PropTypes.any.isRequired,
}

export default Icon;
