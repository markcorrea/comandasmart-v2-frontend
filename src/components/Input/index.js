import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import UIInputLabel from '@material-ui/core/InputLabel'
import UIInput from '@material-ui/core/Input'
import UIFormControl from '@material-ui/core/FormControl'
import UIInputAdornment from '@material-ui/core/InputAdornment'

import {lightGray, gray} from 'assets/styles/main.module.scss'

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
    textTransform: 'uppercase',
  },
  adornmentRoot: {
    color: gray,
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
      <UIFormControl fullWidth variant='outlined'>
        {label && (
          <UIInputLabel shrink classes={{root: classes.labelRoot}}>
            {label}
          </UIInputLabel>
        )}
        <UIInput
          classes={{root: classes.inputRoot, underline: classes.inputUnderline}}
          startAdornment={startIcon ? setAdornment(startIcon, 'start') : null}
          endAdornment={endIcon ? setAdornment(endIcon, 'end') : null}
          {...rest}
        />
      </UIFormControl>
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
