import React from 'react'
import PropTypes from 'prop-types'

import {Paper} from 'components'

import styles from './index.module.scss'

const ProductCard = ({order, onDeleteClick}) => {
  const {
    product: {unique_code, name, unit_type},
    price,
    quantity,
  } = order
  return (
    <Paper inset className={styles.container}>
      <div className={styles.productNumber}>{unique_code}</div>
      <div className={styles.productName}>{`${name} - (${quantity}${unit_type ? unit_type : ''})`}</div>
      <div className={styles.price}>{price}</div>
    </Paper>
  )
}

ProductCard.propTypes = {
  order: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func,
}

export default ProductCard
