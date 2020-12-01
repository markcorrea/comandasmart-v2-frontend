import React from 'react'
import PropTypes from 'prop-types'

import {KeyboardDateTimePicker} from '@material-ui/pickers'
import {makeStyles} from '@material-ui/core/styles'

import {gray} from 'assets/styles/main.module.scss'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  inputRoot: {
    height: '50px',
    padding: '17px 10px',
    borderRadius: '8px',
    border: `solid thin ${gray}`,
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
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    '&&+.MuiInput-formControl': {
      marginTop: '20px',
    },
    '&&.Mui-focused': {
      color: gray,
    },
  },
}))

const Datetimepicker = ({label, value, onChange, disableTyping, className, ...props}) => {
  const classes = useStyles()

  return (
    <div className={className}>
      <KeyboardDateTimePicker
        disableToolbar
        format='dd/MM/yyyy'
        label={label}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        classes={{root: classes.root}}
        InputProps={{
          disabled: !!disableTyping,
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
        cancelLabel='Cancelar'
        todayLabel='Hoje'
        {...props}
      />
    </div>
  )
}

Datetimepicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  disableTyping: PropTypes.bool,
  className: PropTypes.string,
}

Datetimepicker.defaultProps = {
  label: null,
  value: new Date(),
  disableTyping: false,
  onChange: () => {},
}

export default Datetimepicker
