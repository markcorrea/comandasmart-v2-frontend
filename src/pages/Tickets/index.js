import React, {useEffect} from 'react'

import {Button, Paper, TicketCard} from 'components'

import {useStore} from 'store'

import styles from './index.module.scss'

const Tickets = () => {
  const store = useStore()
  useEffect(() => {
    store.showMenu()
  }, [store])

  const headerButtonClass = {
    root: {
      float: 'right',
      marginLeft: '20px',
    },
  }

  const ticket = {
    number: 1,
    userName: 'Daniela Maria dos Santos Costa Soares',
    price: 'R$92,80',
    lastOrder: '00:40',
  }

  return (
    <>
      <header className={styles.header}>
        <Button classes={headerButtonClass}>Nova Comanda</Button>
        <Button classes={headerButtonClass}>Venda Rápida</Button>
        <h1>Comandas</h1>
      </header>
      <Paper className={styles.paper}>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <div className={styles.flexCell}>
          <TicketCard ticket={ticket} />
        </div>
        <button className={styles.addButton}>
          <i className='fas fa-plus-circle'></i>
        </button>
      </Paper>
    </>
  )
}

export default Tickets
