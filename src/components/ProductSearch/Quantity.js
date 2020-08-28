import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import NumberInput from 'components/NumberInput'

import styles from './index.module.scss'

const Quantity = ({quantity, setQuantity, disabled}) => {
  const decrement = () => (quantity > 0 ? setQuantity(parseInt(quantity) - 1) : null)
  const increment = () => setQuantity(parseInt(quantity) + 1)

  const Minus = () => (
    <i
      className={`fa fa-minus ${clsx(styles.icon, styles.counterButton, disabled && styles.disabled)}`}
      onClick={!disabled ? decrement : null}
    />
  )
  const Plus = () => (
    <i
      className={`fa fa-plus ${clsx(styles.icon, styles.counterButton, disabled && styles.disabled)}`}
      onClick={!disabled ? increment : null}
    />
  )

  return (
    <NumberInput
      value={quantity}
      onChange={setQuantity}
      disabled={disabled}
      label=' '
      thousandSeparator
      startIcon={<Minus />}
      endIcon={<Plus />}
    />
  )
}

Quantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Quantity.defaultProps = {
  disabled: false,
}

export default Quantity
