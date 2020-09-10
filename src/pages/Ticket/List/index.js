import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {Paper, TicketCard, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

const TicketList = () => {
  const {showMenu, setLoading} = useStore()
  const history = useHistory()

  const {getTickets} = useServices()

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets()
      if (result) setTickets(result.data)
    }
    fetchTickets()
  }, [getTickets, setTickets, setLoading])

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
        {tickets.length ? (
          tickets.map((ticket, index) => (
            <div key={`ticket_${index}`} className={styles.flexCell}>
              <TicketCard ticket={ticket} onClick={() => ticketClick(ticket.id)} />
            </div>
          ))
        ) : (
          <div className={styles.noTickets}>Não há comandas abertas.</div>
        )}

        <div style={{padding: '20px'}}>
          <SpeedDial buttons={tableButtons} />
        </div>
      </Paper>
    </>
  )
}

export default TicketList
