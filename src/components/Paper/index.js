import React from 'react'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

const Paper = ({children, inset, classes, ...props}) => {
  const boxShadow = inset ? 'inset 5px 5px 14px -4px rgba(196,196,196,1)' : '0px 0px 15px 5px rgba(227,227,227,1)'

  const useStyles = makeStyles(() => ({
    root: {
      borderRadius: '10px',
      boxShadow: boxShadow,
    },
    ...classes,
  }))

  const paperClasses = useStyles()

  return (
    <UIPaper {...props} classes={paperClasses}>
      {children}
    </UIPaper>
  )
}

Paper.propTypes = {
  children: PropTypes.any.isRequired,
  inset: PropTypes.bool,
  classes: PropTypes.object,
}

Paper.defaultProps = {
  inset: false,
  classes: {},
}

export default Paper
