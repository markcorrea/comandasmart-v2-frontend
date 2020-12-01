import React, {lazy, Suspense} from 'react'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import ErrorBoundary from 'utils/routeHelpers/ErrorBoundary'
import DelayedFallback from 'utils/routeHelpers/DelayedFallback'

import Layout from 'layouts/Layout'
import {ConfirmDialog} from 'components'
import Store from 'store'

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../pages/Login'))

const ForgotPassword = lazy(() => import(/* webpackChunkName: "ForgotPassword" */ '../pages/Password/ForgotPassword'))
const RedefinePassweord = lazy(() => import(/* webpackChunkName: "RedefinePassword" */ '../pages/Password/RedefinePassword'))
const CashierList = lazy(() => import(/* webpackChunkName: "CashierList" */ '../pages/Cashier/List'))
const CashierBalance = lazy(() => import(/* webpackChunkName: "CashierBalance" */ '../pages/Cashier/Balance'))
const CashierFront = lazy(() => import(/* webpackChunkName: "CashierFront" */ '../pages/Cashier/Front'))
const CashierTicket = lazy(() => import(/* webpackChunkName: "CashierTicket" */ '../pages/Cashier/Ticket'))
const CashierSale = lazy(() => import(/* webpackChunkName: "CashierSale" */ '../pages/Cashier/Sale'))
const ClientList = lazy(() => import(/* webpackChunkName: "ClientList" */ '../pages/Client/List'))
const ClientDetails = lazy(() => import(/* webpackChunkName: "ClientDetails" */ '../pages/Client/Details'))
const CompanyList = lazy(() => import(/* webpackChunkName: "CompanyList" */ '../pages/Company/List'))
const CompanyDetails = lazy(() => import(/* webpackChunkName: "CompanyDetails" */ '../pages/Company/Details'))
const ProductList = lazy(() => import(/* webpackChunkName: "ProductList" */ '../pages/Product/List'))
const ProductDetails = lazy(() => import(/* webpackChunkName: "ProductDetails" */ '../pages/Product/Details'))
const Reports = lazy(() => import(/* webpackChunkName: "Reports" */ '../pages/Report'))
const ProductSales = lazy(() => import(/* webpackChunkName: "ProductSales" */ '../pages/Report/ProductSales'))
const ReportSales = lazy(() => import(/* webpackChunkName: "ReportSales" */ '../pages/Report/Sales'))
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
      <Store>
        <ErrorBoundary>
          <Layout>
            <>
              <ConfirmDialog />
              <ErrorBoundary>
                <Suspense fallback={<DelayedFallback />}>
                  <Switch>
                    <Redirect path='/' exact to='/login' />
                    <Route path='/login' component={Login} />
                    <Route path='/forgot_password' component={ForgotPassword} />
                    <Route path='/redefine_password' component={RedefinePassweord} />
                    <Route path='/cashiers' component={CashierList} layout={Layout} />
                    <Route exact path='/cashier/:cashierId' component={CashierFront} />
                    <Route exact path='/cashier/:cashierId/ticket/:ticketId' component={CashierTicket} />
                    <Route exact path='/cashier/:cashierId/balance' component={CashierBalance} />
                    <Route exact path='/cashier/:cashierId/sale' component={CashierSale} />
                    <Route path='/clients' component={ClientList} />
                    <Route exact path='/client/:clientId' component={ClientDetails} />
                    <Route exact path='/client' component={ClientDetails} />
                    <Route path='/companies' component={CompanyList} layout={Layout} />
                    <Route path='/company/:companyId' component={CompanyDetails} />
                    <Route path='/company' component={CompanyDetails} layout={Layout} />
                    <Route path='/products' component={ProductList} layout={Layout} />
                    <Route path='/product/:productId' component={ProductDetails} />
                    <Route path='/product' component={ProductDetails} />
                    <Route exact path='/reports' component={Reports} />
                    <Route exact path='/report_product_sales' component={ProductSales} />
                    <Route exact path='/report_sales' component={ReportSales} />
                    <Route path='/terminals' component={TerminalList} layout={Layout} />
                    <Route exact path='/terminal/:terminalId/view' component={TerminalView} />
                    <Route exact path='/terminal/:terminalId' component={TerminalDetails} />
                    <Route exact path='/terminal' component={TerminalDetails} />
                    <Route path='/tickets' component={TicketList} layout={Layout} />
                    <Route path='/ticket/:ticketId' component={TicketDetails} />
                    <Route path='/ticket' component={TicketDetails} />
                    <Route path='/users' component={UserList} />
                    <Route path='/user/:userId' component={UserDetails} />
                    <Route path='/user' component={UserDetails} />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </ErrorBoundary>
            </>
          </Layout>
        </ErrorBoundary>
      </Store>
    </Router>
  )
}

export default AppRouter
