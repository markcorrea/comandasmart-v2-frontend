import React from 'react'
import PropTypes from 'prop-types'

import {Paper} from 'components'

import styles from './index.module.scss'

const TicketCard = ({ticket, onClick, inset}) => {
  const {number, userName, price, lastOrder} = ticket
  return (
    <Paper inset={inset} className={styles.container} onClick={() => onClick(ticket)}>
      <div className={styles.timer}>
        <div className={styles.clock}>
          <i className='far fa-clock' />
        </div>
        <span>{lastOrder}</span>
      </div>
      <div className={styles.ticketNumber}>{number}</div>
      <div className={styles.userName}>{userName}</div>
      <div className={styles.price}>{price}</div>
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
