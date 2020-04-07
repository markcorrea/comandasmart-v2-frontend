import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {StylesProvider} from '@material-ui/styles'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import Theme from '../src/assets/themes/index'
import 'assets/fontawesome/fa.css'

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiThemeProvider theme={Theme}>{storyFn()}</MuiThemeProvider>
    </MuiPickersUtilsProvider>
  </StylesProvider>
)

export default StylesDecorator
