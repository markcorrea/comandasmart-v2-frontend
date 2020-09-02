import React, {useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {Paper, TicketCard, SpeedDial} from 'components'

import {useStore} from 'store'

import tickets from 'mocks/ticket'

import styles from './index.module.scss'

const CashierFront = () => {
  const store = useStore()
  const history = useHistory()
  const {cashierId} = useParams()

  useEffect(() => {
    store.showMenu()
  }, [store])

  const tableButtons = [
    {
      label: 'Registrar Venda',
      onClick: () => history.push(`/cashier/${cashierId}/sale`),
    },
    {
      label: 'Fechar Caixa',
      onClick: selectedItems => console.log('Fechar Caixa', selectedItems),
    },
  ]

  const ticketClick = ticket => history.push(`/cashier/${cashierId}/ticket/${ticket.id}`)

  return (
    <>
      <header className={styles.header}>
        <h1>Frente de Caixa</h1>
      </header>
      <Paper className={styles.paper}>
        {tickets.data.map((ticket, index) => (
          <div key={`ticket_${index}`} className={styles.flexCell}>
            <TicketCard ticket={ticket} onClick={ticketClick} />
          </div>
        ))}
        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </Paper>
    </>
  )
}

export default CashierFront
