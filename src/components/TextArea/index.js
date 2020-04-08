import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import {lightGray} from 'assets/styles/main.module.scss'

const useStyles = makeStyles(() => ({
  inputRoot: {
    minHeight: '50px',
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

const TextArea = ({label, ...rest}) => {
  const classes = useStyles()

  return (
    <div>
      <TextField
        multiline
        label={label}
        InputProps={{
          classes: {root: classes.inputRoot, underline: classes.inputUnderline},
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

TextArea.propTypes = {
  label: PropTypes.string,
}

TextArea.defaultProps = {
  label: null,
}

export default TextArea
