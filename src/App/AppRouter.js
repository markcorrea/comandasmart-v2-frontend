import React, {lazy} from 'react'
import {HashRouter as Router, Switch, Redirect} from 'react-router-dom'

import Layout from 'layouts/Layout'

import LoadableRoute from 'utils/LoadableRoute'

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../pages/Login'))
const Tickets = lazy(() => import(/* webpackChunkName: "Tickets" */ '../pages/Tickets'))
const ClientList = lazy(() => import(/* webpackChunkName: "ClientList" */ '../pages/ClientList'))
const ClientDetails = lazy(() => import(/* webpackChunkName: "ClientDetails" */ '../pages/ClientDetails'))
const ProductList = lazy(() => import(/* webpackChunkName: "ProductList" */ '../pages/ProductList'))
const ProductDetails = lazy(() => import(/* webpackChunkName: "ProductDetails" */ '../pages/ProductDetails'))
const CompanyDetails = lazy(() => import(/* webpackChunkName: "CompanyDetails" */ '../pages/CompanyDetails'))
const UserDetails = lazy(() => import(/* webpackChunkName: "UserDetails" */ '../pages/UserDetails'))
const TerminalList = lazy(() => import(/* webpackChunkName: "TerminalList" */ '../pages/TerminalList'))
// const TerminalDetails = lazy(() => import(/* webpackChunkName: "TerminalDetails" */ '../pages/TerminalDetails'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './NotFound'))

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Redirect path='/' exact to='/login' />

        <LoadableRoute path='/login' component={Login} layout={Layout} />
        <LoadableRoute path='/tickets' component={Tickets} layout={Layout} />
        <LoadableRoute path='/clients' component={ClientList} layout={Layout} />
        <LoadableRoute exact path='/client/details' component={ClientDetails} layout={Layout} />
        <LoadableRoute exact path='/client/details/:clientId' component={ClientDetails} layout={Layout} />
        <LoadableRoute path='/products' component={ProductList} layout={Layout} />
        <LoadableRoute exact path='/product/details' component={ProductDetails} layout={Layout} />
        <LoadableRoute exact path='/product/details/:productId' component={ProductDetails} layout={Layout} />
        <LoadableRoute path='/company/details' component={CompanyDetails} layout={Layout} />
        <LoadableRoute path='/user/details' component={UserDetails} layout={Layout} />
        <LoadableRoute path='/terminals' component={TerminalList} layout={Layout} />
        {/* <LoadableRoute exact path='/terminal/details' component={TerminalDetails} layout={Layout} />
        <LoadableRoute exact path='/terminal/details/:terminalId' component={TerminalDetails} layout={Layout} /> */}
        <LoadableRoute component={NotFound} layout={Layout} />
      </Switch>
    </Router>
  )
}

export default AppRouter
