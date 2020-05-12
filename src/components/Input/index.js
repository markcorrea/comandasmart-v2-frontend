import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import UIInputAdornment from '@material-ui/core/InputAdornment'

import {gray} from 'assets/styles/main.module.scss'

const Input = ({label, startIcon, endIcon, classes: {input}, ...rest}) => {
  const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      // height: '100px',
    },
    inputRoot: {
      height: '50px',
      padding: '17px 10px',
      borderRadius: '8px',
      border: `solid thin ${gray}`,
      '&&.Mui-error': {
        border: `solid thin red`,
      },
    },
    input: {
      ...input,
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
      color: gray,
      marginLeft: '15px',
      textTransform: 'uppercase',
      '&&+.MuiInput-formControl': {
        marginTop: '20px',
      },
      '&&.Mui-focused': {
        color: gray,
      },
    },
    adornmentRoot: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    formHelperTextRoot: {
      margin: '4px 15px 4px'
    },
  }))

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
        classes={{root: classes.root}}
        InputProps={{
          classes: {root: classes.inputRoot, input: classes.input, underline: classes.inputUnderline},
          startAdornment: startIcon ? setAdornment(startIcon, 'start') : null,
          endAdornment: endIcon ? setAdornment(endIcon, 'end') : null,
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
          },
          shrink: true,
        }}
        FormHelperTextProps={{
          classes: {root: classes.formHelperTextRoot},
        }}
        autoComplete='comanda-smart-password'
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
  classes: PropTypes.object,
}

Input.defaultProps = {
  label: null,
  classes: {},
}

export default Input
