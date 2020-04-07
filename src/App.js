import React from 'react'

import {ThemeProvider, CssBaseline} from '@material-ui/core'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import Header from 'components/Header'
import theme from 'assets/themes'

import 'assets/fontawesome/fa.css'
import 'assets/styles/main.module.scss'

const App = () => {
  return (
    <CssBaseline>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <div className='App'>
            <header className='App-header'>
              <Header />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                Learn React
              </a>
            </header>
          </div>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </CssBaseline>
  )
}

export default App
