import React from 'react'
import PropTypes from 'prop-types'

import UIButton from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

import {ronchi, darkGray, smallFontSize, robotoBoldFontFamily} from 'assets/styles/main.module.scss'

const Button = ({children, classes: {root}, onClick}) => {
  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: ronchi,
      border: `solid thin transparent`,
      color: darkGray,
      fontSize: smallFontSize,
      lineHeight: smallFontSize,
      borderRadius: '10px',
      padding: '11px 20px 9px',
      minWidth: '200px',
      fontFamily: robotoBoldFontFamily,
      ...root,
    },
  }))

  const buttonClasses = useStyles()

  return (
    <UIButton classes={buttonClasses} onClick={onClick}>
      {children}
    </UIButton>
  )
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
