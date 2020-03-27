import React from 'react'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

const Paper = ({children}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      borderRadius: '10px',
      boxShadow: '0px 0px 15px 5px rgba(227,227,227,1)',
      padding: '20px',
    },
  }))

  const classes = useStyles()

  return <UIPaper classes={classes}>{children}</UIPaper>
}

Paper.propTypes = {
  children: PropTypes.any,
}

export default Paper
