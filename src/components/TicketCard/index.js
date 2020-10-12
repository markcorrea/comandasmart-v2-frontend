import React from 'react'
import PropTypes from 'prop-types'

import {Paper} from 'components'

import {useStore} from 'store'

import styles from './index.module.scss'

const TicketCard = ({ticket, onClick, inset}) => {
  const {unique_code, client, total_price, lastOrder} = ticket

  const {loading} = useStore()
  return (
    <Paper inset={inset} className={styles.container} onClick={!loading ? () => onClick(ticket) : null}>
      <div className={styles.timer}>
        <div className={styles.clock}>
          <i className='far fa-clock' />
        </div>
        <span>{lastOrder}</span>
      </div>
      <div className={styles.ticketNumber}>{unique_code}</div>
      <div className={styles.userName}>{(client && client.name) || '--'}</div>
      <div className={styles.price}>{total_price}</div>
    </Paper>
  )
}

TicketCard.propTypes = {
  ticket: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  inset: PropTypes.bool,
}

TicketCard.defaultProps = {
  onClick: () => {},
  inset: true,
}

export default TicketCard
