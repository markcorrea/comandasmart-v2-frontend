import React, {lazy} from 'react'
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Layout from 'layouts/Layout'

import LoadableRoute from 'utils/LoadableRoute'

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../pages/Login'))
const Tickets = lazy(() => import(/* webpackChunkName: "Tickets" */ '../pages/Tickets'))
const ClientList = lazy(() => import(/* webpackChunkName: "ClientList" */ '../pages/ClientList'))
const ClientDetails = lazy(() => import(/* webpackChunkName: "ClientDetails" */ '../pages/ClientDetails'))
const ProductDetails = lazy(() => import(/* webpackChunkName: "ProductDetails" */ '../pages/ProductDetails'))
const CompanyDetails = lazy(() => import(/* webpackChunkName: "CompanyDetails" */ '../pages/CompanyDetails'))
const UserDetails = lazy(() => import(/* webpackChunkName: "UserDetails" */ '../pages/UserDetails'))
const TerminalDetails = lazy(() => import(/* webpackChunkName: "TerminalDetails" */ '../pages/TerminalDetails'))

const AppRouter = () => {
  return (
    <Router basename='/app'>
      <Switch>
        <Redirect path='/' exact to='/login' />

        <LoadableRoute path='/login' component={Login} layout={Layout} />
        <LoadableRoute path='/tickets' component={Tickets} layout={Layout} />
        <LoadableRoute path='/client/list' component={ClientList} layout={Layout} />
        <LoadableRoute path='/client/details' component={ClientDetails} layout={Layout} />
        <LoadableRoute path='/product/details' component={ProductDetails} layout={Layout} />
        <LoadableRoute path='/company/details' component={CompanyDetails} layout={Layout} />
        <LoadableRoute path='/user/details' component={UserDetails} layout={Layout} />
        <LoadableRoute path='/terminal/details' component={TerminalDetails} layout={Layout} />
      </Switch>
    </Router>
  )
}

export default AppRouter
