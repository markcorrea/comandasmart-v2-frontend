import {createMuiTheme} from '@material-ui/core/styles'

import {mediaQueryXS, mediaQuerySM, mediaQueryMD, mediaQueryLG, mediaQueryXL} from 'assets/styles/main.module.scss'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: Number(mediaQueryXS),
      sm: Number(mediaQuerySM),
      md: Number(mediaQueryMD),
      lg: Number(mediaQueryLG),
      xl: Number(mediaQueryXL),
    },
  },
})

export default theme
