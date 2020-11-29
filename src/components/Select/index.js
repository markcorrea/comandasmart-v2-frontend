import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import UIInputAdornment from '@material-ui/core/InputAdornment'

import {gray} from 'assets/styles/main.module.scss'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  selectRoot: {
    height: '50px',
    padding: '17px 10px',
    borderRadius: '8px',
    border: `solid thin ${gray}`,
    '&&.Mui-error': {
      border: `solid thin red`,
    },
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
    color: '#979797',
    marginLeft: '15px',
    textTransform: 'uppercase',
    '&&+.MuiInput-formControl': {
      marginTop: '20px',
    },
    '&&.Mui-focused': {
      color: '#979797',
    },
  },
  adornmentRoot: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}))

const Select = ({label, startIcon, endIcon, items, showEmptyOption, isRequired, ...rest}) => {
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
        select
        classes={{root: classes.root}}
        label={`${label} ${isRequired ? '*' : ''}`}
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
        {showEmptyOption && <MenuItem value=''>--</MenuItem>}
        {items.map((item, index) => (
          <MenuItem key={`item_${index}`} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

const iconProps = PropTypes.oneOfType([PropTypes.element, PropTypes.string])

Select.propTypes = {
  label: PropTypes.string,
  startIcon: iconProps,
  endIcon: iconProps,
  items: PropTypes.array,
  showEmptyOption: PropTypes.bool,
  isRequired: PropTypes.bool,
}

Select.defaultProps = {
  label: null,
  items: [],
}

export default Select
