import React from 'react'
import PropTypes from 'prop-types'

import {Paper} from 'components'

import styles from './index.module.scss'

const OrderCard = ({order}) => {
  const {
    product: {name, unit_type},
    ticket_id,
    quantity,
  } = order
  return (
    <Paper inset className={styles.container}>
      <div className={styles.productNumber}>{`Comanda ${ticket_id}`}</div>
      <div className={styles.productName}>{`${name} - (${quantity}${unit_type ? unit_type : ''})`}</div>
    </Paper>
  )
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderCard
