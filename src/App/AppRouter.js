import React, {lazy} from 'react'
import {HashRouter as Router, Switch, Redirect} from 'react-router-dom'

import Layout from 'layouts/Layout'

import LoadableRoute from 'utils/LoadableRoute'

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../pages/Login'))

const CashierList = lazy(() => import(/* webpackChunkName: "CashierList" */ '../pages/Cashier/List'))
const CashierFront = lazy(() => import(/* webpackChunkName: "CashierFront" */ '../pages/Cashier/Front'))
const CashierTicket = lazy(() => import(/* webpackChunkName: "CashierTicket" */ '../pages/Cashier/Ticket'))
const CashierSale = lazy(() => import(/* webpackChunkName: "CashierSale" */ '../pages/Cashier/Sale'))
const ClientList = lazy(() => import(/* webpackChunkName: "ClientList" */ '../pages/Client/List'))
const ClientDetails = lazy(() => import(/* webpackChunkName: "ClientDetails" */ '../pages/Client/Details'))
const CompanyList = lazy(() => import(/* webpackChunkName: "CompanyList" */ '../pages/Company/List'))
const CompanyDetails = lazy(() => import(/* webpackChunkName: "CompanyDetails" */ '../pages/Company/Details'))
const ProductList = lazy(() => import(/* webpackChunkName: "ProductList" */ '../pages/Product/List'))
const ProductDetails = lazy(() => import(/* webpackChunkName: "ProductDetails" */ '../pages/Product/Details'))
const TerminalList = lazy(() => import(/* webpackChunkName: "TerminalList" */ '../pages/Terminal/List'))
const TerminalView = lazy(() => import(/* webpackChunkName: "TerminalView" */ '../pages/Terminal/View'))
const TerminalDetails = lazy(() => import(/* webpackChunkName: "TerminalDetails" */ '../pages/Terminal/Details'))
const TicketList = lazy(() => import(/* webpackChunkName: "TicketList" */ '../pages/Ticket/List'))
const TicketDetails = lazy(() => import(/* webpackChunkName: "TicketDetails" */ '../pages/Ticket/Details'))
const UserList = lazy(() => import(/* webpackChunkName: "UserList" */ '../pages/User/List'))
const UserDetails = lazy(() => import(/* webpackChunkName: "UserDetails" */ '../pages/User/Details'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './NotFound'))

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Redirect path='/' exact to='/login' />

        <LoadableRoute path='/login' component={Login} layout={Layout} />
        <LoadableRoute path='/cashiers' component={CashierList} layout={Layout} />
        <LoadableRoute exact path='/cashier/:cashierId' component={CashierFront} layout={Layout} />
        <LoadableRoute exact path='/cashier/:cashierId/ticket/:ticketId' component={CashierTicket} layout={Layout} />
        <LoadableRoute exact path='/cashier/:cashierId/sale' component={CashierSale} layout={Layout} />
        <LoadableRoute path='/clients' component={ClientList} layout={Layout} />
        <LoadableRoute exact path='/client/:clientId' component={ClientDetails} layout={Layout} />
        <LoadableRoute exact path='/client' component={ClientDetails} layout={Layout} />
        <LoadableRoute path='/companies' component={CompanyList} layout={Layout} />
        <LoadableRoute path='/company/:companyId' component={CompanyDetails} layout={Layout} />
        <LoadableRoute path='/company' component={CompanyDetails} layout={Layout} />
        <LoadableRoute path='/products' component={ProductList} layout={Layout} />
        <LoadableRoute path='/product/:productId' component={ProductDetails} layout={Layout} />
        <LoadableRoute path='/product' component={ProductDetails} layout={Layout} />
        <LoadableRoute path='/terminals' component={TerminalList} layout={Layout} />
        <LoadableRoute exact path='/terminal/:terminalId' component={TerminalDetails} layout={Layout} />
        <LoadableRoute exact path='/terminal' component={TerminalDetails} layout={Layout} />
        <LoadableRoute exact path='/terminal/view/:terminalId' component={TerminalView} layout={Layout} />
        <LoadableRoute path='/tickets' component={TicketList} layout={Layout} />
        <LoadableRoute path='/ticket/:ticketId' component={TicketDetails} layout={Layout} />
        <LoadableRoute path='/ticket' component={TicketDetails} layout={Layout} />
        <LoadableRoute path='/users' component={UserList} layout={Layout} />
        <LoadableRoute path='/user/:userId' component={UserDetails} layout={Layout} />
        <LoadableRoute path='/user' component={UserDetails} layout={Layout} />
        <LoadableRoute component={NotFound} layout={Layout} />
      </Switch>
    </Router>
  )
}

export default AppRouter
