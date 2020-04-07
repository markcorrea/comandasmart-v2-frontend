import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import UIInputAdornment from '@material-ui/core/InputAdornment'

import {lightGray} from 'assets/styles/main.module.scss'

const useStyles = makeStyles(() => ({
  inputRoot: {
    height: '50px',
    padding: '17px 10px',
    borderRadius: '8px',
    border: `solid thin ${lightGray}`,
  },
  inputUnderline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  labelRoot: {
    marginLeft: '15px',
    textTransform: 'uppercase',
    '&&+.MuiInput-formControl': {
      marginTop: '25px',
    },
  },
  adornmentRoot: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}))

const Input = ({label, startIcon, endIcon, ...rest}) => {
  const classes = useStyles()

  const setAdornment = (icon, position) => {
    return (
      <UIInputAdornment classes={{root: classes.adornmentRoot}} position={position}>
        {icon}
      </UIInputAdornment>
    )
  }

  return (
    <div>
      <TextField
        label={label}
        InputProps={{
          classes: {root: classes.inputRoot, underline: classes.inputUnderline},
          startAdornment: startIcon ? setAdornment(startIcon, 'start') : null,
          endAdornment: endIcon ? setAdornment(endIcon, 'end') : null,
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
          },
          shrink: true,
        }}
        {...rest}
      />
    </div>
  )
}

const iconProps = PropTypes.oneOfType([PropTypes.element, PropTypes.string])

Input.propTypes = {
  label: PropTypes.string,
  startIcon: iconProps,
  endIcon: iconProps,
}

Input.defaultProps = {
  label: null,
}

export default Input
