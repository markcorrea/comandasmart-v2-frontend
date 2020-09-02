import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, TicketCard, SpeedDial} from 'components'

import {useStore} from 'store'

import tickets from 'mocks/ticket'

import styles from './index.module.scss'

const TicketList = () => {
  const store = useStore()
  const history = useHistory()

  useEffect(() => {
    store.showMenu()
  }, [store])

  const tableButtons = [
    {
      label: 'Nova Comanda',
      onClick: selectedItems => console.log('DELETING', selectedItems),
    },
  ]

  const ticketClick = id => history.push(`ticket/${id}`)

  return (
    <>
      <header className={styles.header}>
        <h1>Comandas</h1>
      </header>
      <Paper className={styles.paper}>
        {tickets.data.map((ticket, index) => (
          <div key={`ticket_${index}`} className={styles.flexCell}>
            <TicketCard ticket={ticket} onClick={() => ticketClick(ticket.id)} />
          </div>
        ))}

        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </Paper>
    </>
  )
}

export default TicketList
