import React from 'react'
import 'assets/fontawesome/fa.css'

import Header from 'components/Header'

import {ThemeProvider, CssBaseline} from '@material-ui/core'
import theme from 'assets/themes'
import 'assets/styles/main.module.scss'

const App = () => {
  return (
    <CssBaseline>
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
    </CssBaseline>
  )
}

export default App
