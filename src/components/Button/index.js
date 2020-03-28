import React from 'react'
import PropTypes from 'prop-types'

import UIButton from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import {ronchi, elPaso, smallFontSize} from 'assets/styles/main.module.scss'

const Button = ({children, classes, onClick}) => {
  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: ronchi,
      color: elPaso,
      fontWeight: '900',
      fontSize: smallFontSize,
      borderRadius: '10px',
      padding: '10px 20px',
      minWidth: '200px',
    },
    ...classes,
  }))

  const buttonClasses = useStyles()

  return <UIButton classes={buttonClasses} onClick={onClick}>{children}</UIButton>
}

Button.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  classes: {},
  children: 'button',
  onClick: () => {},
}

export default Button
