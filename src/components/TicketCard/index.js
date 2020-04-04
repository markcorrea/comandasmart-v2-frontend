import React from 'react'

import Paper from 'components/Paper'

import styles from './index.module.scss'

const TicketCard = () => {
  return (
    <Paper inset className={styles.container}>
      <div className={styles.ticketNumber}>1005</div>
      <div className={styles.userName}>Daniela Maria</div>
      <div className={styles.price}>R$86,99</div>
      <div className={styles.timer}>
        <div className={styles.clock}></div>
      </div>
    </Paper>
  )
}

export default TicketCard
