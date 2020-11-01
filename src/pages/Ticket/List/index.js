import React, {useState, useRef, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import {Modal, NumberInput, Paper, PlusButton, TicketCard} from 'components'

import {useStore} from 'store'

import useServices from 'services'

import styles from './index.module.scss'

const ModalBody = ({value, onChange}) => {
  const ref = useRef('')
  const focus = () => ref.current.focus()

  useEffect(() => focus(), [])

  return (
    <div className={styles.modalBody}>
      <NumberInput ref={ref} label={''} value={value} onChange={onChange} />
      {!value && <span className={styles.codeWarning}>Only numbers and cannot be empty.</span>}
    </div>
  )
}

ModalBody.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
}

const TicketList = () => {
  const {showMenu, setLoading} = useStore()
  const history = useHistory()

  const {getTickets, createTicketByCode} = useServices()

  const [tickets, setTickets] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [code, setCode] = useState('')

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

  const createNewTicket = useCallback(
    async code => {
      const result = await createTicketByCode({unique_code: code})
      if (result) history.push(`/ticket/${result.data.id}`)
    },
    [createTicketByCode, history]
  )

  const ticketClick = id => history.push(`ticket/${id}`)

  const modalConfirm = () => {
    if (code && code !== '') {
      createNewTicket(code)
      return setModalOpen(false)
    }
  }

  const modalCancel = () => {
    setCode('')
    setModalOpen(false)
  }

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
      </Paper>
      <div className={styles.plusButtonContainer}>
        <PlusButton onClick={() => setModalOpen(true)} />
      </div>

      <Modal header='Digite um código para a nova comanda.' onConfirm={modalConfirm} onCancel={modalCancel} open={modalOpen}>
        <ModalBody value={code} onChange={value => setCode(value)} />
      </Modal>
    </>
  )
}

export default TicketList
