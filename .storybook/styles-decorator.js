import React from 'react'

import {StylesProvider} from '@material-ui/styles'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import 'assets/fontawesome/fa.css'

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>{storyFn()}</MuiPickersUtilsProvider>
  </StylesProvider>
)

export default StylesDecorator
