import React, {Suspense} from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'

import ErrorBoundary from './ErrorBoundary'
import DelayedFallback from './DelayedFallback'

const EmptyLayout = ({children}) => <>{children}</>

EmptyLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

/**
 * This wrapper helps with lazy loading of page,
 * encapsulates errors, adds optional Page Layout,
 * and show a Loading component within a respectful delay.
 *
 * @param {object} props
 * @return {object} React component
 */
const LoadableRoute = ({component: Component, routeComponent: RouteComponent, layout: Layout}) => {
  const PageComponent = () => (
    <ErrorBoundary>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<DelayedFallback />}>
            <Component />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  )

  return <RouteComponent component={PageComponent} />
}

LoadableRoute.propTypes = {
  component: PropTypes.object.isRequired,
  routeComponent: PropTypes.func,
  layout: PropTypes.any,
  // layout: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func, PropTypes.element]),
}

LoadableRoute.defaultProps = {
  routeComponent: Route,
  layout: EmptyLayout,
}

export default LoadableRoute
