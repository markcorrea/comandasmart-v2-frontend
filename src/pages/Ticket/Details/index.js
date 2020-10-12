import React, {useState, useEffect, useCallback, useMemo, memo, useRef} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'

import {ClientSearch, Modal, NumberInput, Paper, ProductCard, ProductSearch, SpeedDial} from 'components'

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

const TicketDetails = () => {
  const {
    searchProductsByName,
    getTicketById,
    addProductToTicketByCode,
    addProductsToTicketById,
    removeProductFromTicket,
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
  const [codeModalOpen, setCodeModalOpen] = useState(false)

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
    async code => {
      const result = await addProductToTicketByCode({ticket: ticketId, code})
      if (result) setTicket({...result.data})
    },
    [ticketId, addProductToTicketByCode, setTicket]
  )

  const addProductByClick = useCallback(
    async ({product, quantity}) => {
      const result = await addProductsToTicketById({ticket: ticketId, product: product.id, quantity})
      if (result) setTicket({...result.data})
    },
    [ticketId, addProductsToTicketById, setTicket]
  )

  const removeProduct = useCallback(
    async productId => {
      const result = await removeProductFromTicket(ticketId, productId)
      if (result) setTicket(result)
    },
    [ticketId, removeProductFromTicket, setTicket]
  )

  const bindClient = useCallback(
    async client => {
      setClientModalOpen(false)
      const result = await bindClientToTicket({ticket: ticketId, client: client.id})
      if (result) setTicket({...result.data})
    },
    [ticketId, bindClientToTicket, setTicket, setClientModalOpen]
  )

  const unbindClient = useCallback(
    async client => {
      const result = await unbindClientFromTicket({ticket: ticketId})
      if (result) setTicket({...result.data})
    },
    [ticketId, unbindClientFromTicket, setTicket]
  )

  const changeCode = useCallback(async () => {
    setCodeModalOpen(false)
    const result = await changeTicketCode({id: ticketId, unique_code: code})
    if (result) setTicket({...result.data})
  }, [ticketId, code, changeTicketCode, setTicket, setCodeModalOpen])

  const formatClientName = useMemo(() => {
    const name = ticket?.client?.name
    if (name) {
      const nameArray = name.split(' ')
      return `(${nameArray[0]} ${nameArray.length > 1 ? nameArray[nameArray.length - 1] : ''})`
    }
    return ''
  }, [ticket])

  const speedDialButtons = useMemo(
    () => [
      {
        label: `${ticket?.client ? 'Remover' : 'Vincular'} Cliente`,
        onClick: () => {
          if (ticket?.client) {
            return confirmationDialog({
              header: 'Remover produto',
              body: `Deseja realmente desvincular ${formatClientName} desta comanda?`,
              onConfirm: () => unbindClient(),
            })
          }
          return setClientModalOpen(true)
        },
      },
      {
        label: `Mudar Mesa`,
        onClick: () => setCodeModalOpen(true),
      },
    ],
    [confirmationDialog, formatClientName, unbindClient, setClientModalOpen, ticket]
  )

  return (
    <>
      <header className={styles.header}>
        <h1>Comanda {ticket ? ticket.unique_code : '--'}</h1>
        <span className={styles.clientInfo}>&nbsp;{formatClientName}</span>
      </header>
      <Paper className={styles.paper}>
        <ProductSearch
          searchProductsByName={searchProductsByName}
          onEnterPress={uniqueCode => addProductByCode(uniqueCode)}
          onConfirm={productData => addProductByClick(productData)}
        />
        {ticket && ticket.orders.length ? (
          ticket.orders.map((order, index) => (
            <div key={`item_${index}`} className={styles.flexCell}>
              <ProductCard
                order={order}
                onDeleteClick={() =>
                  confirmationDialog({
                    header: 'Remover produto',
                    body: `Deseja realmente remover "${order.name}?"`,
                    onConfirm: () => removeProduct(order.id),
                  })
                }
              />
            </div>
          ))
        ) : (
          <div className={styles.emptyTicket}>Não há itens na comanda atual.</div>
        )}
      </Paper>
      <div className={styles.speedDialContainer}>
        <SpeedDial buttons={speedDialButtons} />
      </div>
      <Modal header='Alterar Cliente' onCancel={() => setClientModalOpen(false)} open={clientModalOpen} hideButtons>
        <ClientSearch
          searchClientsByName={searchClientsByName}
          onConfirm={client => bindClient(client)}
          onCancel={() => setClientModalOpen(false)}
        />
      </Modal>
      <Modal header='Digite o novo código.' onConfirm={changeCode} onCancel={() => setCodeModalOpen(false)} open={codeModalOpen}>
        <ModalBody value={code} onChange={value => setCode(value)} />
      </Modal>
    </>
  )
}

export default memo(TicketDetails)
