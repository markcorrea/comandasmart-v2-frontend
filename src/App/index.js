import React from 'react'

import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import MessageProvider from 'components/Message'

import AppRouter from './AppRouter'

import 'assets/fontawesome/fa.css'
import 'assets/styles/main.module.scss'

/**
 * Created the container in which every modal will be inserted.
 */
const modalContainer = document.createElement('div')
modalContainer.setAttribute('id', 'modalContainer')
document.body.append(modalContainer)

const App = () => {
  return (
    <MessageProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppRouter />
      </MuiPickersUtilsProvider>
    </MessageProvider>
  )
}

export default App
