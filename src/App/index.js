import React from 'react'

import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import AppRouter from './AppRouter'

import 'assets/fontawesome/fa.css'
import 'assets/styles/main.module.scss'

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AppRouter />
    </MuiPickersUtilsProvider>
  )
}

export default App
