import React, {lazy} from 'react'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Layout from 'layouts/Layout'

import LoadableRoute from 'utils/LoadableRoute'

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../pages/Login'))

const AppRouter = () => {
  return (
    <Router basename='/app'>
      <Switch>
        <Redirect path='/' exact to='/login' />

        <LoadableRoute path='/login' component={Login} layout={Layout} />
      </Switch>
    </Router>
  )
}

export default AppRouter
