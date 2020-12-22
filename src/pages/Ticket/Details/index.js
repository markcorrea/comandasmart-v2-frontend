import React, {useState, useEffect, useCallback, useMemo, memo, useRef} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'

import {Button, ClientSearch, Modal, NumberInput, Paper, ProductCard, ProductSearch, SpeedDial} from 'components'

import {useStore} from 'store'

import useServices from 'services'
import useMediaQuery from 'utils/mediaQuery'
import {mediaQueryMD} from 'assets/styles/_mediaQueries.scss'

import formatMoney from 'utils/formatMoney'

import NewClientModalBody from './NewClientModalBody'

import styles from './index.module.scss'

const ModalBody = ({value, onChange}) => {
  const ref = useRef('')
  const focus = () => ref.current.focus()

  useEffect(() => focus(), [])

  return (
    <div className={styles.modalBody}>
      <NumberInput ref={ref} label={''} value={value} onChange={onChange} />
      {!value && <span className={styles.codeWarning}>Apenas números, campo obrigatório.</span>}
    </div>
  )
}

ModalBody.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
}

const ClientModalBody = ({searchClientsByName, bindClient, setClientModalOpen, onNewClientClick}) => {
  return (
    <ClientSearch
      searchClientsByName={searchClientsByName}
      onNewClientClick={onNewClientClick}
      onConfirm={client => bindClient(client)}
      onCancel={() => setClientModalOpen(false)}
    />
  )
}

ClientModalBody.propTypes = {
  searchClientsByName: PropTypes.func,
  bindClient: PropTypes.func,
  setClientModalOpen: PropTypes.func,
  onNewClientClick: PropTypes.func,
}

const TicketDetails = () => {
  const {
    searchProductsByName,
    getTicketById,
    addProductToTicketByCode,
    addProductsToTicketById,
    searchClientsByName,
    bindClientToTicket,
    unbindClientFromTicket,
    changeTicketCode,
  } = useServices()
  const {showMenu, confirmationDialog} = useStore()
  const {ticketId} = useParams()

  const [code, setCode] = useState('')
  const [ticket, setTicket] = useState(null)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [newClientModalOpen, setNewClientModalOpen] = useState(false)
  const [codeModalOpen, setCodeModalOpen] = useState(false)
  const mediaMD = useMediaQuery('min', mediaQueryMD)

  useEffect(() => {
    showMenu()
  }, [showMenu])

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await getTicketById(ticketId)
      if (result) setTicket({...result.data})
    }

    fetchTicket(ticketId)
  }, [ticketId, getTicketById, setTicket])

  const addProductByCode = useCallback(
    async (code, inputToFocus) => {
      const result = await addProductToTicketByCode({ticket: ticketId, code})
      if (result) setTicket({...result.data})
      if (inputToFocus) inputToFocus.current.focus()
    },
    [ticketId, addProductToTicketByCode, setTicket]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}, inputToFocus) => {
      const result = await addProductsToTicketById({ticket: ticketId, product: product.id, quantity})
      if (result) setTicket({...result.data})
      if (inputToFocus) inputToFocus.current.focus()
    },
    [ticketId, addProductsToTicketById, setTicket]
  )

  const bindClient = useCallback(
    async client => {
      setClientModalOpen(false)
      const result = await bindClientToTicket({ticket: ticketId, client: client.id})
      if (result) setTicket({...result.data})
    },
    [ticketId, bindClientToTicket, setTicket, setClientModalOpen]
  )

  const unbindClient = useCallback(async () => {
    const result = await unbindClientFromTicket({ticket: ticketId})
    if (result) setTicket({...result.data})
  }, [ticketId, unbindClientFromTicket, setTicket])

  const changeCode = useCallback(async () => {
    setCodeModalOpen(false)
    const result = await changeTicketCode({id: ticketId, unique_code: code})
    if (result) setTicket({...result.data})
  }, [ticketId, code, changeTicketCode, setTicket, setCodeModalOpen])

  const formatClientName = useMemo(() => (ticket?.client?.name ? `(${ticket.client.name})` : ''), [ticket])

  const bindingActions = useCallback(() => {
    if (ticket?.client) {
      return confirmationDialog({
        header: 'Excluir cliente',
        body: `Deseja realmente desvincular "${ticket.client.name}"?`,
        onConfirm: () => unbindClient(),
      })
    }

    return setClientModalOpen(true)
  }, [ticket, setClientModalOpen, unbindClient, confirmationDialog])

  const onNewClientClick = useCallback(() => {
    setClientModalOpen(false)
    setNewClientModalOpen(true)
  }, [setClientModalOpen, setNewClientModalOpen])

  const buttons = [
    {
      label: `${ticket?.client ? 'Remover' : 'Vincular'} Cliente`,
      onClick: () => bindingActions(),
    },
    {
      label: 'Mudar Mesa',
      onClick: () => setCodeModalOpen(true),
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda {ticket ? ticket.unique_code : '--'}</h1>
        <span className={styles.clientInfo}>&nbsp;{formatClientName}</span>
        {mediaMD && (
          <>
            <Button className={styles.headerButton} onClick={() => bindingActions()}>
              <>{ticket?.client ? 'Remover' : 'Vincular'} Cliente</>
            </Button>
            <Button className={styles.headerButton} onClick={() => setCodeModalOpen(true)}>
              Mudar Mesa
            </Button>
          </>
        )}
      </header>
      <Paper className={styles.paper}>
        <div className={styles.total}>
          Total: <span>{formatMoney(parseFloat(ticket?.total_price || 0))}</span>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.searchContainer}>
            <ProductSearch
              searchProductsByName={searchProductsByName}
              onEnterPress={(uniqueCode, inputToFocus) => addProductByCode(uniqueCode, inputToFocus)}
              onConfirm={(productData, inputToFocus) => addProductByClick(productData, inputToFocus)}
            />
          </div>
          <div className={styles.ticketsContainer}>
            {ticket && ticket.orders.length ? (
              ticket.orders.map((order, index) => (
                <div key={`item_${index}`} className={styles.flexCell}>
                  <ProductCard order={order} />
                </div>
              ))
            ) : (
              <div className={styles.emptyTicket}>Não há itens na comanda atual.</div>
            )}
          </div>
        </div>
      </Paper>
      {!mediaMD && (
        <div className={styles.speedDialContainer}>
          <SpeedDial buttons={buttons} />
        </div>
      )}
      <Modal
        maxWidth='md'
        header='Novo Cliente'
        onCancel={() => setNewClientModalOpen(false)}
        open={newClientModalOpen}
        hideButtons>
        <NewClientModalBody onConfirm={bindClient} closeModal={() => setNewClientModalOpen(false)} />
      </Modal>
      <Modal header='Alterar Cliente' onCancel={() => setClientModalOpen(false)} open={clientModalOpen} hideButtons>
        <ClientModalBody
          searchClientsByName={searchClientsByName}
          bindClient={bindClient}
          setClientModalOpen={setClientModalOpen}
          onNewClientClick={onNewClientClick}
        />
      </Modal>
      <Modal header='Digite o novo código.' onConfirm={changeCode} onCancel={() => setCodeModalOpen(false)} open={codeModalOpen}>
        <ModalBody value={code} onChange={value => setCode(value)} />
      </Modal>
    </>
  )
}

export default memo(TicketDetails)
