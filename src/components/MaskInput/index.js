import React from 'react'
import PropTypes from 'prop-types'

import {Input} from 'components'

import MaskedInput from 'react-text-mask'

const TextMaskCustom = ({inputRef, ...other}) => {
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={false}
    />
  )
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func,
}

const MaskInput = ({value, onChange, mask, ...rest}) => {
  return (
    <Input
      {...rest}
      value={value}
      onChange={onChange}
      name='textmask'
      id='formatted-text-mask-input'
      inputProps={{
        mask: mask,
      }}
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
    />
  )
}

MaskInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  mask: PropTypes.array,
}

MaskInput.defaultProps = {
  mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
}

export default MaskInput
