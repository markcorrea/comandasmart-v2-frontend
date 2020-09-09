import React from 'react'
import PropTypes from 'prop-types'

import {Paper} from 'components'

import styles from './index.module.scss'

const OrderCard = ({order}) => {
  const {name, ticket} = order
  return (
    <Paper inset className={styles.container}>
      <div className={styles.productNumber}>{ticket}</div>
      <div className={styles.productName}>{name}</div>
    </Paper>
  )
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderCard
