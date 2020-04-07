import React from 'react'
import PropTypes from 'prop-types'

import {KeyboardDatePicker} from '@material-ui/pickers'
import {makeStyles} from '@material-ui/core/styles'

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
}))

const Datepicker = ({label, value, onChange}) => {
  const classes = useStyles()

  return (
    <KeyboardDatePicker
      disableToolbar
      format='dd/MM/yyyy'
      label={label}
      value={value}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          underline: classes.inputUnderline,
        },
      }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
        },
      }}
    />
  )
}

Datepicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
}

Datepicker.defaultProps = {
  label: null,
  value: new Date(),
  onChange: () => {},
}

export default Datepicker
