import React from 'react'
import PropTypes from 'prop-types'

import {Input} from 'components'

import NumberFormat from 'react-number-format'

const NumberFormatCustom = ({inputRef, onChange, prefix, ...other}) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange(values.value)
      }}
      isNumericString
      prefix={prefix}
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
}

const NumberInput = ({value, onChange, prefix, thousandSeparator, decimalScale, ...rest}) => {
  return (
    <Input
      {...rest}
      value={value}
      onChange={onChange}
      name='numberformat'
      id='formatted-number-input'
      inputProps={{prefix, thousandSeparator, decimalScale}}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  )
}

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  thousandSeparator: PropTypes.bool,
  decimalScale: PropTypes.number,
}

NumberInput.defaultProps = {
  prefix: '',
  thousandSeparator: false,
  decimalScale: 0,
}

export default NumberInput
