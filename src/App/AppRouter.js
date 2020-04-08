import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Input from 'components/Input'
import Button from 'components/Button'

import LoadableRoute from 'utils/LoadableRoute'

const Layout = ({children}) => {
  return (
    <div>
      Layout goes here!
      <br />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
}

const AppRouter = () => {
  return (
    <Router basename='/app'>
      <Switch>
        <Redirect path='/' exact to='/main' />

        <LoadableRoute path='/main' component={Input} layout={Layout} />
        <LoadableRoute path='/other' component={Button} layout={Layout} />
      </Switch>
    </Router>
  )
}

export default AppRouter
