import React from 'react'
import PropTypes from 'prop-types'

import {Paper} from 'components'

import styles from './index.module.scss'

const ProductCard = ({product, onDeleteClick}) => {
  const {number, name, price} = product
  return (
    <Paper inset className={styles.container}>
      <div className={styles.trash} onClick={onDeleteClick}>
        <i className='fas fa-trash' />
      </div>

      <div className={styles.productNumber}>{number}</div>
      <div className={styles.productName}>{name}</div>
      <div className={styles.price}>{price}</div>
    </Paper>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func,
}

export default ProductCard
