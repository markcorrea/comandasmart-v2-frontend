import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {Paper, TicketCard, SpeedDial} from 'components'

import {useStore} from 'store'

import services from 'services'

import styles from './index.module.scss'

const CashierFront = () => {
  const {showMenu, setLoading} = useStore()
  const history = useHistory()
  const {cashierId} = useParams()
  const [tickets, setTickets] = useState([])

  const {getTickets} = services

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const result = await getTickets()
      if (result) {
        setTickets(result.data)
      }
      setLoading(false)
    }
    fetchTickets()
  }, [getTickets, setTickets, setLoading])

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
        {tickets.map((ticket, index) => (
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
