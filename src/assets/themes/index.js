import {createMuiTheme} from '@material-ui/core/styles'

import {mediaQueryMedium, mediaQueryLarge, mediaQueryExLarge, elPaso} from 'assets/styles/main.module.scss'

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
}))

export default theme
