import React from 'react'

import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ptLocale from 'date-fns/locale/pt'

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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
        <AppRouter />
      </MuiPickersUtilsProvider>
    </MessageProvider>
  )
}

export default App
