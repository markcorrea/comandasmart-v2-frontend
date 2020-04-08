import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import UIInputAdornment from '@material-ui/core/InputAdornment'

import {lightGray} from 'assets/styles/main.module.scss'

const useStyles = makeStyles(() => ({
  selectRoot: {
    height: '50px',
    padding: '17px 10px',
    borderRadius: '8px',
    border: `solid thin ${lightGray}`,
  },
  selectUnderline: {
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

const Select = ({label, startIcon, endIcon, items, ...rest}) => {
  const classes = useStyles()

  const setAdornment = (icon, position) => {
    return (
      <UIInputAdornment classes={{root: classes.adornmentRoot}} position={position}>
        {icon}
      </UIInputAdornment>
    )
  }

  return (
    <TextField
      select
      value={''}
      label={label}
      InputProps={{
        classes: {root: classes.selectRoot, underline: classes.selectUnderline},
        startAdornment: startIcon ? setAdornment(startIcon, 'start') : null,
        endAdornment: endIcon ? setAdornment(endIcon, 'end') : null,
      }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
        },
        shrink: true,
      }}
      {...rest}>
      <MenuItem value=''>--</MenuItem>
      {items.map((item, index) => (
        <MenuItem key={`item_${index}`} value={item.value}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>
  )
}

const iconProps = PropTypes.oneOfType([PropTypes.element, PropTypes.string])

Select.propTypes = {
  label: PropTypes.string,
  startIcon: iconProps,
  endIcon: iconProps,
  items: PropTypes.array,
}

Select.defaultProps = {
  label: null,
  items: [],
}

export default Select
