import {
  blue500,
  blue700,
  darkBlack,
  grey300,
  lightBlack,
  white
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const userAgent = () =>
  (typeof( navigator ) === 'undefined' ? {} : navigator).userAgent

const muiTheme = () => getMuiTheme({
  spacing: {
    iconSize: 20,
    desktopGutter: 20,
    desktopGutterMore: 26,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopLeftNavMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  fontFamily: 'Montserrat',
  palette: {
    primary1Color: '#50E3C2',
    primary2Color: '#FC615D',
    primary3Color: '#FE9958',
    accent1Color: '#DE3358',
    accent2Color: '#DE4008',
    accent3Color: '#999999',
    textColor: '#4F4F4F',
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade( darkBlack, 0.3 ),
    pickerHeaderColor: blue500,
  },
  tableRow: {
    stripeColor: '#FBFBFB'
  },
  avatar: {
    borderColor: white,
  },
  listItem: {
    leftIconColor: blue700,
    color: blue700,
  },
  textField: {
    underlineFocusStyle: {
      color: lightBlack
    }
  },
  formArea: {
    maxWidth: 800,
  }
}, { userAgent: userAgent() });

export default muiTheme;
