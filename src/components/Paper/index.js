import React from 'react'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

const Paper = ({children, inset}) => {
  const boxShadow = inset ? 'inset 15px 15px 11px -14px rgba(196,196,196,1)' : '0px 0px 15px 5px rgba(227,227,227,1)'

  const useStyles = makeStyles(() => ({
    root: {
      borderRadius: '10px',
      boxShadow: boxShadow,
    },
  }))

  const classes = useStyles()

  return <UIPaper classes={classes}>{children}</UIPaper>
}

Paper.propTypes = {
  children: PropTypes.any,
  inset: PropTypes.bool,
}

Paper.defaultProps = {
  inset: false,
}

export default Paper
