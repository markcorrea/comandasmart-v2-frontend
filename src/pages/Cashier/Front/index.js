import React, {useState, useEffect, useCallback} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {Button, Paper, SpeedDial, TicketCard} from 'components'

import {useStore} from 'store'

import useServices from 'services'
import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'

import styles from './index.module.scss'

const CashierFront = () => {
  const {showMenu} = useStore()
  const history = useHistory()
  const {cashierId} = useParams()
  const mediaMD = useMediaQuery('min', mediaQueryMD)

  const [tickets, setTickets] = useState([])
  const [cashier, setCashier] = useState(null)

  const {getTickets, getCashierById} = useServices()

  useEffect(() => {
    showMenu()
  }, [showMenu])

  const fetchCashier = useCallback(
    async id => {
      const result = await getCashierById(id)
      if (result) {
        setCashier(result.data)
      }
    },
    [getCashierById, setCashier]
  )

  const fetchTickets = useCallback(async () => {
    const result = await getTickets()
    if (result) setTickets(result.data)
  }, [getTickets, setTickets])

  useEffect(() => {
    if (cashierId) {
      fetchCashier(cashierId)
    }
  }, [cashierId, fetchCashier])

  useEffect(() => {
    if (cashier && !cashier.close_date) {
      fetchTickets()
    }
  }, [cashier, fetchTickets])

  const ticketClick = ticket => history.push(`/cashier/${cashierId}/ticket/${ticket.id}`)

  const buttons = [
    {
      label: 'Controle de Caixa',
      onClick: () => history.push(`/cashier/${cashierId}/balance`),
    },
    {
      label: 'Registrar Venda',
      onClick: () => history.push(`/cashier/${cashierId}/sale`),
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <h1>Frente de Caixa</h1>
        {mediaMD && (
          <>
            <Button className={styles.headerButton} onClick={() => history.push(`/cashier/${cashierId}/balance`)}>
              Controle de Caixa
            </Button>
            <Button
              className={styles.headerButton}
              onClick={() => history.push(`/cashier/${cashierId}/sale`)}
              disabled={cashier?.close_date}>
              Registrar Venda
            </Button>
          </>
        )}
      </header>
      <Paper className={styles.paper}>
        {!cashier?.close_date ? (
          tickets.length ? (
            tickets.map((ticket, index) => (
              <div key={`ticket_${index}`} className={styles.flexCell}>
                <TicketCard ticket={ticket} onClick={ticketClick} />
              </div>
            ))
          ) : (
            <div className={styles.noTickets}>Não há comandas abertas.</div>
          )
        ) : (
          <div className={styles.noTickets}>Caixa fechado. Não há comandas para exibir.</div>
        )}
      </Paper>
      {!mediaMD && (
        <div className={styles.speedDialContainer}>
          <SpeedDial buttons={buttons} />
        </div>
      )}
    </>
  )
}

export default CashierFront
