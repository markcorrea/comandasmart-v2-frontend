import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {Paper, TicketCard, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

const CashierFront = () => {
  const {showMenu} = useStore()
  const history = useHistory()
  const {cashierId} = useParams()
  const [tickets, setTickets] = useState([])

  const {getTickets} = useServices()

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets()
      if (result) setTickets(result.data)
    }
    fetchTickets()
  }, [getTickets, setTickets])

  const tableButtons = [
    {
      label: 'Registrar Venda',
      onClick: () => history.push(`/cashier/${cashierId}/sale`),
    },
    {
      label: 'Fechar Caixa',
      onClick: () => history.push(`/cashier/${cashierId}/balance`),
    },
  ]

  const ticketClick = ticket => history.push(`/cashier/${cashierId}/ticket/${ticket.id}`)

  return (
    <>
      <header className={styles.header}>
        <h1>Frente de Caixa</h1>
      </header>
      <Paper className={styles.paper}>
        {tickets.length ? (
          tickets.map((ticket, index) => (
            <div key={`ticket_${index}`} className={styles.flexCell}>
              <TicketCard ticket={ticket} onClick={ticketClick} />
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

export default CashierFront
