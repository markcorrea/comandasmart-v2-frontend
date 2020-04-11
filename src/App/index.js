import React from 'react'

import {ThemeProvider, CssBaseline} from '@material-ui/core'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import theme from 'assets/themes'

import AppRouter from './AppRouter'

import 'assets/fontawesome/fa.css'
import 'assets/styles/main.module.scss'

const App = () => {
  return (
    <CssBaseline>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </CssBaseline>
  )
}

export default App
