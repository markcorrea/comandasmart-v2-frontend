import {createMuiTheme} from '@material-ui/core/styles'

import {
  defaultFontFamily,
  defaultFontSize,
  smallFontSize,
  h1FontSize,
  h2FontSize,
  h3FontSize,
  titleFontWeight,
  titleLineHeight,
  titleLetterSpacing,
  black,
  darkestBlue,
  darkBlue,
  lightBlue,
  darkGray,
  lightGray,
  lima,
  crusta,
  coralRed,
  blueBell,
  mediaQueryMedium,
  mediaQueryLarge,
  mediaQueryExLarge,
} from 'assets/styles/main.module.scss'

const theme = createMuiTheme(theme => ({
  breakpoints: {
    ...theme.breakpoints,
    values: {
      xs: mediaQueryMedium,
      sm: mediaQueryLarge,
      md: 1024,
      lg: mediaQueryExLarge,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      main: darkBlue,
      dark: darkestBlue,
      contrastText: black,
    },
    secondary: {
      main: lightGray,
      dark: darkGray,
      contrastText: black,
    },
    success: {
      main: lima,
      contrastText: black,
    },
    error: {
      main: coralRed,
      contrastText: black,
    },
    warning: {
      main: crusta,
      contrastText: black,
    },
    info: {
      main: blueBell,
      contrastText: black,
    },
    action: {
      disabledBackground: lightBlue,
    },
  },
  typography: {
    fontFamily: defaultFontFamily,
    fontSize: parseInt(defaultFontSize.replace('px', '')),
    h1: {
      fontSize: h1FontSize,
      fontWeight: titleFontWeight,
      lineHeight: titleLineHeight,
      letterSpacing: titleLetterSpacing,
    },
    h2: {
      fontSize: h2FontSize,
      fontWeight: titleFontWeight,
      lineHeight: titleLineHeight,
      letterSpacing: titleLetterSpacing,
    },
    h3: {
      fontSize: h3FontSize,
      fontWeight: titleFontWeight,
      lineHeight: titleLineHeight,
      letterSpacing: titleLetterSpacing,
    },
    button: {
      fontSize: defaultFontSize,
      fontWeight: 500,
      textTransform: 'capitalize',
      lineHeight: '23px',
    },
    caption: {
      fontSize: smallFontSize,
    },
    body1: {
      fontSize: defaultFontSize,
    },
    body2: {
      fontSize: defaultFontSize,
    },
    overline: {
      fontSize: defaultFontSize,
    },
  },
  overrides: {
    MuiCollapse: {
      /* That's been used form the Component/Alert */
      container: {
        position: 'relative',
        top: '80px',
      },
    },
  },
}))

export default theme
